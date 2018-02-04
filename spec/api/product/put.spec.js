const rp = require('request-promise');
const lib = require('../../../lib/index');
const models = require('../../../mongo/models.mongo');
const error = require('../../../lib/errors.list');
const mongoose = require('mongoose');

xdescribe("Put Product colors", () => {

  let brandId, typeId;
  beforeEach(done => {
    lib.dbHelpers.dropAll()
      .then(res => {
        brandId = mongoose.Types.ObjectId();
        typeId = mongoose.Types.ObjectId();
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });


  it("should add a new product", function (done) {

    this.done = done;

    rp({
      method: 'put',
      uri: lib.helpers.apiTestURL(`product`),
      body: {
        name: 'sample name',
        product_type: typeId,
        brand: brandId,
        base_price: 30000,
        desc: 'some description for this product',
      },
      json: true,
      resolveWithFullResponse: true
    }).then(res => {
      expect(res.statusCode).toBe(200);

      return models['ProductTest'].find({})

    }).then(res => {
      expect(res.length).toBe(1);
      done();

    })
      .catch(lib.helpers.errorHandler.bind(this));
  });
  it("expect error when name of product is not defined", function (done) {

    this.done = done;

    rp({
      method: 'put',
      uri: lib.helpers.apiTestURL(`product`),
      body: {
        // name: 'sample name',
        product_type: typeId,
        brand: brandId,
        base_price: 30000,
        desc: 'some description for this product',
      },
      json: true,
      resolveWithFullResponse: true
    }).then(res => {
      this.fail('did not failed when other users are calling api');
      done();
    })
      .catch(err => {
        expect(err.statusCode).toBe(error.productNameRequired.status);
        expect(err.error).toBe(error.productNameRequired.message);
        done();
      });

  });
  it("expect error when product type of product is not defined", function (done) {

    this.done = done;

    rp({
      method: 'put',
      uri: lib.helpers.apiTestURL(`product`),
      body: {
        name: 'sample name',
        // product_type: typeId,
        brand: brandId,
        base_price: 30000,
        desc: 'some description for this product',
      },
      json: true,
      resolveWithFullResponse: true
    }).then(res => {
      this.fail('did not failed when other users are calling api');
      done();
    })
      .catch(err => {
        expect(err.statusCode).toBe(error.productTypeRequired.status);
        expect(err.error).toBe(error.productTypeRequired.message);
        done();
      });

  });
  it("expect error when brand of product is not defined", function (done) {

    this.done = done;

    rp({
      method: 'put',
      uri: lib.helpers.apiTestURL(`product`),
      body: {
        name: 'sample name',
        product_type: typeId,
        // brand: brandId,
        base_price: 30000,
        desc: 'some description for this product',
      },
      json: true,
      resolveWithFullResponse: true
    }).then(res => {
      this.fail('did not failed when other users are calling api');
      done();
    })
      .catch(err => {
        expect(err.statusCode).toBe(error.productBrandRequired.status);
        expect(err.error).toBe(error.productBrandRequired.message);
        done();
      });

  });
  it("expect error when base of product is not defined", function (done) {

    this.done = done;

    rp({
      method: 'put',
      uri: lib.helpers.apiTestURL(`product`),
      body: {
        name: 'sample name',
        product_type: typeId,
        brand: brandId,
        // base_price: 30000,
        desc: 'some description for this product',
      },
      json: true,
      resolveWithFullResponse: true
    }).then(res => {
      this.fail('did not failed when other users are calling api');
      done();
    })
      .catch(err => {
        expect(err.statusCode).toBe(error.productBasePriceRequired.status);
        expect(err.error).toBe(error.productBasePriceRequired.message);
        done();
      });

  });


});

describe("Put Product Basic data", () => {

  let productId;
  beforeEach(done => {
    lib.dbHelpers.dropAll()
      .then(res => {
        let product = models['ProductTest']({
          name: 'sample name',
          product_type: mongoose.Types.ObjectId(),
          brand: mongoose.Types.ObjectId(),
          base_price: 30000,
          desc: 'some description for this product',
        });
        return product.save();

      })
      .then(res => {
        productId = res._id;
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });


  it("should add a new color/images set for a product", function (done) {

    this.done = done;

    rp({
      method: 'put',
      uri: lib.helpers.apiTestURL(`product/colors`),
      body: {},
      json: true,
      resolveWithFullResponse: true
    }).then(res => {
      expect(res.statusCode).toBe(200);

      return models['ProductTest'].find({})

    }).then(res => {
      expect(res.length).toBe(1);
      done();

    })
      .catch(lib.helpers.errorHandler.bind(this));
  });
  // it("expect error when name of product is not defined", function (done) {
  //
  //   this.done = done;
  //
  //   rp({
  //     method: 'put',
  //     uri: lib.helpers.apiTestURL(`product`),
  //     body: {
  //       // name: 'sample name',
  //       product_type: typeId,
  //       brand: brandId,
  //       base_price: 30000,
  //       desc: 'some description for this product',
  //     },
  //     json: true,
  //     resolveWithFullResponse: true
  //   }).then(res => {
  //     this.fail('did not failed when other users are calling api');
  //     done();
  //   })
  //     .catch(err => {
  //       expect(err.statusCode).toBe(error.productNameRequired.status);
  //       expect(err.error).toBe(error.productNameRequired.message);
  //       done();
  //     });
  //
  // });
  // it("expect error when product type of product is not defined", function (done) {
  //
  //   this.done = done;
  //
  //   rp({
  //     method: 'put',
  //     uri: lib.helpers.apiTestURL(`product`),
  //     body: {
  //       name: 'sample name',
  //       // product_type: typeId,
  //       brand: brandId,
  //       base_price: 30000,
  //       desc: 'some description for this product',
  //     },
  //     json: true,
  //     resolveWithFullResponse: true
  //   }).then(res => {
  //     this.fail('did not failed when other users are calling api');
  //     done();
  //   })
  //     .catch(err => {
  //       expect(err.statusCode).toBe(error.productTypeRequired.status);
  //       expect(err.error).toBe(error.productTypeRequired.message);
  //       done();
  //     });
  //
  // });
  // it("expect error when brand of product is not defined", function (done) {
  //
  //   this.done = done;
  //
  //   rp({
  //     method: 'put',
  //     uri: lib.helpers.apiTestURL(`product`),
  //     body: {
  //       name: 'sample name',
  //       product_type: typeId,
  //       // brand: brandId,
  //       base_price: 30000,
  //       desc: 'some description for this product',
  //     },
  //     json: true,
  //     resolveWithFullResponse: true
  //   }).then(res => {
  //     this.fail('did not failed when other users are calling api');
  //     done();
  //   })
  //     .catch(err => {
  //       expect(err.statusCode).toBe(error.productBrandRequired.status);
  //       expect(err.error).toBe(error.productBrandRequired.message);
  //       done();
  //     });
  //
  // });
  // it("expect error when base of product is not defined", function (done) {
  //
  //   this.done = done;
  //
  //   rp({
  //     method: 'put',
  //     uri: lib.helpers.apiTestURL(`product`),
  //     body: {
  //       name: 'sample name',
  //       product_type: typeId,
  //       brand: brandId,
  //       // base_price: 30000,
  //       desc: 'some description for this product',
  //     },
  //     json: true,
  //     resolveWithFullResponse: true
  //   }).then(res => {
  //     this.fail('did not failed when other users are calling api');
  //     done();
  //   })
  //     .catch(err => {
  //       expect(err.statusCode).toBe(error.productBasePriceRequired.status);
  //       expect(err.error).toBe(error.productBasePriceRequired.message);
  //       done();
  //     });
  //
  // });


});