const lib = require('../../lib/index');
const models = require('../../mongo/models.mongo');
const mongoose = require('mongoose');
const Delivery = require('../../lib/delivery.model');
const warehouses = require('../../warehouses');


describe('making shelf code', () => {
  let deliveries;
  let hub_id;
  beforeEach(done => {
    lib.dbHelpers.dropAll().then(() => {
      return models['WarehouseTest'].insertMany(warehouses)
    }).then((res) => {
      hub_id = res.find(w => w.is_hub === true)._id;
      deliveries = [{
        order_details: {
          order_id: mongoose.Types.ObjectId(),
          order_line_ids: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()]
        },
        from: {warehouse_id: hub_id},
        to: {warehouse_id: mongoose.Types.ObjectId()},
        shelf_code: "AB",
      },
        {
          order_details: {
            order_id: mongoose.Types.ObjectId(),
            order_line_ids: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()]
          },
          from: {warehouse_id: mongoose.Types.ObjectId()},
          to: {warehouse_id: hub_id},
          shelf_code: "AB",
        }];
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
    delivery.makeDeliveryShelfCode(5).then(data => {
      done();
    });
  });


});