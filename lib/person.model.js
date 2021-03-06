const rp = require('request-promise');
const Base = require('./base.model');
const error = require('./errors.list');
const env = require('../env');
const jwt = require('jsonwebtoken');
const models = require('../mongo/models.mongo');
const mongoose = require('mongoose');
const _const = require('../lib/const.list');
const socket = require('../socket');
const Warehouse = require('./warehouse.model');

const JwtSecret = 'f^1l0oT';
const diffAgentCustomer = 'agent';
const PersonType = {
  Customer: 'Customer',
  Agent: 'Agent',
};

class Person extends Base {
  constructor(test = Person.test, modelName = 'Customer') {
    Person.test = test;
    super(modelName, test);
    this.PersonModel = this.model;
  }

  loginCheck(username, password, personType = PersonType.Customer, access_level) {
    let foundPerson;

    return this.load(username, password, personType, access_level)
      .then(person => {
        foundPerson = person;
        return Person.checkPassword(person.secret, password)
      })
      .then(() => {
        return Promise.resolve(foundPerson);
      })
  }

  load(username, password, personType, access_level) {
    let searchData = {active: true};
    
    if (personType === PersonType.Customer)
      searchData = Object.assign({
        $or: [{username: new RegExp(username, 'i')}, {mobile_no: username}],
      }, searchData);
    if (personType === PersonType.Agent)
      searchData = Object.assign({username: new RegExp(username, 'i'), access_level}, searchData);

    return this.PersonModel.findOne(searchData).lean()
      .then(res => {
        if (res) {
          return Promise.resolve(res);
        }
        else
          return Promise.reject(error.noUser);
      })
  }

  afterLogin(user, isAgent) {
    if (!user)
      return Promise.resolve({});

    // don't use this.PersonModel here. because current instance of person is made by API response without modelName.
    // so, default model name is always used ('Customer')
    const curCon = models()[(isAgent ? 'Agent' : 'Customer') + (Person.test ? 'Test' : '')];

    // Person.setNamespace(username);
    return curCon.findOne({
      _id: mongoose.Types.ObjectId(user.id.toString()),
      active: true
    }).lean()
      .then(res => {
        if (!res)
          return Promise.reject(error.noUser);
        else {

          // don't send user info! instead, send proper error for the client to know how to react
          if (res.hasOwnProperty('is_verified') && res.is_verified !== _const.VERIFICATION.bothVerified) {
            switch (res.is_verified) {
              case _const.VERIFICATION.notVerified:
                return Promise.reject(error.notVerified);
              case _const.VERIFICATION.mobileVerified:
                return Promise.reject(error.notEmailVerified);
              case _const.VERIFICATION.emailVerified:
                return Promise.reject(error.notMobileVerified);
            }
          }

          let obj = {
            username: res.username,
            personType: isAgent ? 'agent' : 'customer',
            id: res._id,
            shoesType: res.shoesType,
            displayName: (res.first_name + ' ' + res.surname).trim(),
            name: res.first_name.trim(),
            surname: res.surname.trim(),
            mobile_no: res.mobile_no,
            national_id: res.national_id,
            dob: res.dob,
            gender: res.gender,
            is_preferences_set: res.is_preferences_set,
          };

          if (isAgent) {
            obj['access_level'] = res.access_level;
            if (user.hasOwnProperty('warehouse_id')) {
              obj['warehouse_id'] = user.warehouse_id;
              return Promise.resolve(obj);

            }
          }
          else
            obj['is_verified'] = (res.is_verified === _const.VERIFICATION.bothVerified);

          return Promise.resolve(obj);
        }
      });
  }

  static serialize(person, done) {

    const obj = {
      id: person.id,
      personType: person.personType,
      googleAuth: person.googleAuth,
    };

    if (person.hasOwnProperty('warehouse_id'))
      obj['warehouse_id'] = person.warehouse_id;

    done(null, obj);
  }

  static deserialize(req, person, done) {

    Person.userCheck(req, person.personType, person.id)
      .then((foundPerson) => {
        if (person && !foundPerson) {
          req.logout()
            .then(() => done(error.noUser));
        }
        if (!foundPerson) {
          done(error.noUser);
        } else {
          if (person.hasOwnProperty('warehouse_id')) {
            // todo: test this
            foundPerson['warehouse_id'] = person.warehouse_id;
          }
          if (person.googleAuth) {
            rp({
              method: 'get',
              uri: 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + person.googleAuth,
            })
              .then(res => {
                done(null, Object.assign(foundPerson, {id: foundPerson._id}));
              })
              .catch(err => {
                done(err);
              });
          } else {
            done(null, Object.assign(foundPerson, {id: foundPerson._id}))
          }
        }
      })
      .catch(err => {
        console.error(err.message);
        done(err);
      });
  }

  static passportLocalStrategy(req, username, password, done) {
    let personType = req.url && req.url.toLowerCase().includes(diffAgentCustomer.toLowerCase()) ?
      PersonType.Agent :
      PersonType.Customer;

    let person = new Person(Person.isTest(req), personType);
    person.loginCheck(username, password, personType, req.body.loginType)
      .then(foundPerson => {
        const obj = {
          id: foundPerson._id,
          personType
        };

        // don't login if not verified
        if (personType === PersonType.Customer && foundPerson.is_verified !== _const.VERIFICATION.bothVerified) {
          switch (foundPerson.is_verified) {
            case _const.VERIFICATION.notVerified:
              done(error.notVerified, null);
            case _const.VERIFICATION.mobileVerified:
              done(error.notEmailVerified, null);
            case _const.VERIFICATION.emailVerified:
              done(error.notMobileVerified, null);
          }
        }

        // if (req.body.loginType) {
        //   if (['ShopClerk', 'SalesManager', 'DeliveryAgent'].map(r => _const.ACCESS_LEVEL[r].toString()).includes(req.body.loginType.toString())) {
        let err;
        let loginType = Number.parseInt(req.body.loginType, 10);
        if (loginType && (loginType === _const.ACCESS_LEVEL.ShopClerk || loginType === _const.ACCESS_LEVEL.HubClerk)) {

          if (!req.body.hasOwnProperty('warehouse_id')) {
            err = new Error('agent warehouse is not defined');
            done(err, false);
            // todo: test must be written
          } else {
            const warehouse = new Warehouse(Person.isTest(req));
            warehouse.getAll().then(warehouses => {

              if (!warehouses.some(x => x._id.toString() === req.body.warehouse_id)) {
                err = new Error('in valid warehouse id');
                done(err, false);
                // todo: test must be written
              }
              if (loginType === _const.ACCESS_LEVEL.HubClerk &&
                req.body.warehouse_id !== warehouses.find(x => x.is_hub)._id.toString()) {
                err = new Error('no access to this warehouse');
                done(err, false);
                // todo: test must be written
              }
              if (loginType === _const.ACCESS_LEVEL.ShopClerk &&
                req.body.warehouse_id === warehouses.find(x => x.is_hub)._id.toString()) {

                err = new Error('no access to this warehouse');
                done(err, false);
                // todo: test must be written
              }

              // ToDo: should add delivery agent warehouse_id checker (access_level)


              obj['warehouse_id'] = req.body.warehouse_id;
              done(null, obj);
            });
          }
        }
        else if (loginType && loginType === _const.ACCESS_LEVEL.SalesManager) {
          obj['warehouse_id'] = obj.id;
          done(null, obj);
        }
        // }
        // }
        else
          done(null, obj);
      })
      .catch(err => {
        done(err, false);
      });
  }

  static passportOAuthStrategy(req, token, refreshToken, profile, done) {
    if (req.url.toLowerCase().includes(diffAgentCustomer.toLowerCase()))
      done(error.noAccess);
    else {
      let data = {
        username: profile.emails[0].value,
        secret: null,
        first_name: profile.name.givenName,
        surname: profile.name.familyName,
        is_verified: _const.VERIFICATION.bothVerified
      };

      if (profile.gender) {
        data['gender'] = profile.gender.value === 'male' ? 'm' : 'f';
      }

      let curCon = models()['Customer' + (Person.isTest(req) ? 'Test' : '')];
      let customerModel = new curCon(data);

      let p = {
        username: data.username,
        personType: PersonType.Customer,
        googleAuth: profile.provider.toLowerCase() === 'google' ? token : null,
      };

      curCon.findOne({username: data.username}).lean()
        .then(res => {
          if (res) {
            delete data.is_verified;
            delete data.secret;
            return curCon.findOneAndUpdate({_id: res._id}, {$set: data}, {new: true});
          } else
            return customerModel.save();
        })
        .then(res => {
          p = Object.assign({id: res._id}, p);
          done(null, p);
        })
        .catch(err => done(err, null));
    }
  }

  static jwtStrategy(req, isAgent = false) {
    const curCon = models()[(isAgent ? 'Agent' : 'Customer') + (Person.isTest(req) ? 'Test' : '')];

    const decoded_token = jwt.verify(req.jwtToken, JwtSecret);

    let condition = {
      username: decoded_token.username,
      _id: decoded_token.id
    };

    if (isAgent)
      Object.assign(condition, {active: true});
    else
      Object.assign(condition, {is_verified: _const.VERIFICATION.bothVerified});

    return curCon.findOne(condition)
      .then(res => {
        if (!res)
          req.user = null;
        else
          req.user = {
            id: res._id,
            googleAuth: null,
            personType: PersonType.Customer,
            username: res.username,
          };

        return Promise.resolve();
      })
  }

  static jwtAuth(body, isAgent = false) {
    if (!body.username || !body.password)
      return Promise.reject(error.noUsernameOrPassword);

    const person = isAgent ? new Person(Person.test, 'Agent') : new Person(Person.test, 'Customer');
    return person.loginCheck(body.username, body.password, isAgent ? PersonType.Agent : PersonType.Customer, isAgent ? _const.ACCESS_LEVEL.DeliveryAgent : null)
      .then(res => {
        return person.afterLogin({id: res._id}, isAgent);
      })
      .then(res => {
        const payload = {
          username: res.username,
          id: res.id,
        };
        const token = jwt.sign(payload, JwtSecret);
        return Promise.resolve(Object.assign({token: token}, res));
      });
  }

  static checkPassword(secret, password) {
    return new Promise((resolve, reject) => {
      if (!secret)
        reject(error.noPass);
      env.bcrypt.compare(password, secret, (err, res) => {
        if (err)
          reject(err);
        else if (!res)
          reject(error.badPass);
        else
          resolve();
      });
    });
  }

  static userCheck(req, personType, userId) {
    const curCon = models()[(personType === PersonType.Agent ? 'Agent' : 'Customer') + (Person.isTest(req) ? 'Test' : '')];
    return curCon.findOne({_id: userId, active: true}).lean();
  }

  static appOauthLogin(body) {
    let data = {
      username: body.email,
      secret: null,
      first_name: body.givenName,
      surname: body.familyName,
      is_verified: _const.VERIFICATION.emailVerified,
      is_guest: false,
    };

    if (body.gender) {
      data['gender'] = body.gender === 'male' ? 'm' : 'f';
    }

    let curCon = models()['Customer' + (Person.test ? 'Test' : '')];

    return curCon.findOne({username: data.username})
      .then(res => {
        let query = {};

        if (res) {
          delete data.is_verified;
          query = {_id: res._id};
        }

        return curCon.findOneAndUpdate(query,
          {
            $set: data,
          },
          {
            upsert: true,
            new: true,
          });
      })
      .then(res => {
        const payload = {
          username: res.username,
          id: res._id,
        };
        const token = jwt.sign(payload, JwtSecret);
        return Promise.resolve(Object.assign({token: token}, res._doc));
      });
  }

  static isTest(req) {
    if (!req.app) // socket io is also using passport and req does not exist there
      return false;

    return req.app.get('env') === 'development' ? req.query.test === 'tEsT' : false;
  }
}

Person.test = false;
module.exports = Person;
