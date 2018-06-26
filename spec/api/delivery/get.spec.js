const rp = require('request-promise');
const lib = require('../../../lib/index');
const models = require('../../../mongo/models.mongo');
const error = require('../../../lib/errors.list');
const mongoose = require('mongoose');
const _const = require('../../../lib/const.list');
const warehouses = require('../../../warehouses');

describe("it should get delivery's data", () => {
  let deliveries;
  let hub_id;
  let deliveries_id;
  beforeEach(done => {
    lib.dbHelpers.dropAll().then(() => {
      return models['WarehouseTest'].insertMany(warehouses)
    }).then((res) => {
      hub_id = res.find(w => w.is_hub === true)._id;
      deliveries = [
        {
          _id: mongoose.Types.ObjectId(),
          order_details: {
            order_id: mongoose.Types.ObjectId(),
            order_line_ids: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()]
          },
          from: {warehouse_id: hub_id},
          to: {warehouse_id: mongoose.Types.ObjectId()},
          shelf_code: "AZ",
        },
        {
          _id: mongoose.Types.ObjectId(),
          order_details: {
            order_id: mongoose.Types.ObjectId(),
            order_line_ids: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()]
          },
          from: {warehouse_id: hub_id},
          to: {warehouse_id: mongoose.Types.ObjectId()},
          shelf_code: "AA",
        },
        {
          _id: mongoose.Types.ObjectId(),
          order_details: {
            order_id: mongoose.Types.ObjectId(),
            order_line_ids: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()]
          },
          from: {warehouse_id: mongoose.Types.ObjectId()},
          to: {warehouse_id: hub_id},
          shelf_code: "BA",
        },
        {
          _id: mongoose.Types.ObjectId(),
          order_details: {
            order_id: mongoose.Types.ObjectId(),
            order_line_ids: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()]
          },
          from: {warehouse_id: hub_id},
          to: {warehouse_id: mongoose.Types.ObjectId()},

        }
      ];
      deliveries_id = deliveries.map(d => d._id);
      return models['DeliveryTest'].insertMany(deliveries)
    }).then(() => {
      done();
    }).catch(err => {
      console.log(err);
      done();
    });
  });

  it("should get this delivery's data", function (done) {
    this.done = done;
    rp({
      method: 'get',
      uri: lib.helpers.apiTestURL(`delivery/${deliveries_id[1]}`),
      resolveWithFullResponse: true
    }).then(res => {
      expect(res.statusCode).toBe(200);
      let result = JSON.parse(res.body)[0];
      expect(mongoose.Types.ObjectId(result._id).toString()).toBe(deliveries_id[1].toString());
      expect(result.to.toString()).toBe(deliveries[1].to.toString());
      expect(result.from.toString()).toBe(deliveries[1].from.toString());
      done();
    }).catch(lib.helpers.errorHandler.bind(this));
  });


});