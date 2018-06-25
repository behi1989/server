const Base = require('./base.model');

class Warehouse extends Base {

  constructor(test = Warehouse.test) {

    super('Warehouse', test);

    this.WarehouseModel = this.model;
  }


  getAll() {
    return this.WarehouseModel.find().sort().lean();
  }

  getWarehouses() {
    return this.WarehouseModel.find({
      is_hub: false,
    }).sort({priority: 1}).lean();
  }

  getHub() {
    return this.WarehouseModel.find({
      is_hub: true,
    });
  }

  getShops() {
    return this.WarehouseModel.find({
      has_customer_pickup: true,
    }).sort({priority: 1}).lean();
  }
}

Warehouse.test = false;

module.exports = Warehouse;