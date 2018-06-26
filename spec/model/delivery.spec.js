const lib = require('../../lib/index');
const models = require('../../mongo/models.mongo');
const mongoose = require('mongoose');
const Delivery = require('../../lib/delivery.model');
const warehouses = require('../../warehouses');


describe('making shelf code', () => {
  let deliveries;
  let hub_id;
  let delivery_id;
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
          from: {warehouse_id: hub_id},
          to: {warehouse_id: mongoose.Types.ObjectId()},

        }
      ];
      delivery_id = deliveries[2]._id;
      return models['DeliveryTest'].insertMany(deliveries)
    }).then(() => {
      done();
    }).catch(err => {
      console.log(err);
      done();
    });
  });

  it('should make shelf code', function (done) {
    this.done = done;
    let delivery = new Delivery(true);
    delivery.makeDeliveryShelfCode(delivery_id).then(data => {
      console.log("final result = ",data);
      done();
    });
  });
});