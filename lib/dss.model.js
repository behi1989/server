const error = require('./errors.list');
const mongoose = require('mongoose');
const WarehouseModel = require('./warehouse.model');
const ProductModel = require('./product.model');
const CustomerModel = require('./customer.model');
const TicketModel = require('./ticket.model');
const helpers = require('./helpers');
const socket = require('../socket');
const _const = require('./const.list');
const env = require('../env');

class DSS {

  constructor(test) {
    this.test = test;
  }

  startProcess(res) {
    let warehouses;
    return new WarehouseModel(Order.test).getAllWarehouses()
      .then(w => {
        warehouses = w;
        if (!res)
          return Promise.reject(error.orderNotFound);

        if (!res.address)
          return Promise.reject(error.addressIsRequired);

        let promises = [];

        if (!res.is_collect) {
          res.order_lines.forEach(x => {
            promises.push(() => this.ORP(res, x, warehouses))
          });
        }
        else {
          res.order_lines.forEach(x => {
            promises.push(() => this.processCC(res, x, warehouses))
          });
        }
        return promises.reduce((x, y) => x.then(y), Promise.resolve());
      });


  }


  processCC(order, order_line, warehouses) {
    let CCWarehouse = warehouses.find(x => x.address._id.toString() === order.address._id.toString());

    return new ProductModel(Order.test).getInstance(order_line.product_id.toString(), order_line.product_instance_id.toString())
      .then(productInstance => {

        if (!productInstance)
          return Promise.reject(error.productInstanceNotExist);

        let foundInventory = productInstance.inventory.find(x => x.warehouse_id.toString() === CCWarehouse._id.toString() && (x.count - x.reserved > 0));
        if (foundInventory) {

          return new TicketModel(DSS.test).setAutomatedTicket(order, order_line, CCWarehouse, _const.ORDER_STATUS.default);
        }
        else {
          return this.ORP(order, order_line, warehouses, CCWarehouse._id, false) // ORP should return promise not function here
        }
      })
  }

  ORP(order, order_line, warehouses, exceptionId = null) {
    if (exceptionId && exceptionId.toString() === warehouses.find(x => x.is_center)._id.toString())
      return Promise.reject(error.centralWarehouseORPFailed);

    let filteredWarehouses = exceptionId ? warehouses.filter(x => x._id.toString() !== exceptionId.toString()) : warehouses;

    return new ProductModel(Order.test).getInstance(order_line.product_id.toString(), order_line.product_instance_id.toString())
      .then(productInstance => {

        if (!productInstance)
          return Promise.reject(error.productInstanceNotExist);

        let warehouse;

        for (let i = 0; i < filteredWarehouses.length; i++) {
          let foundInventory = productInstance.inventory.find(x => x.warehouse_id.toString() === filteredWarehouses[i]._id.toString() && (x.count - x.reserved > 0));
          if (foundInventory) {
            warehouse = filteredWarehouses[i];
            break;
          }
        }

        let status = _const.ORDER_STATUS.default;
        if (!warehouse) {
          status = _const.ORDER_STATUS.NotExists;
          warehouse = filteredWarehouses.find(x => x.is_center);
        }
        return new TicketModel(DSS.test).setAutomatedTicket(order, order_line, warehouse, status);
      });
  }

}

module.exports = DSS;

