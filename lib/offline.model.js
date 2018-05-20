const error = require('./errors.list');
const mongoose = require('mongoose');
const WarehouseModel = require('./warehouse.model');
const ProductModel = require('./product.model');
const CustomerModel = require('./customer.model');
const helpers = require('./helpers');
const socket = require('../socket');
const _const = require('./const.list');
const env = require('../env');
const DSSModel = require('./dss.model');

class Offline {

  constructor(test) {
    this.test = test;
  }

  manualRequestOnlineWarehouse(orderId, orderLineId, user) {

    if (!orderId || !mongoose.Types.ObjectId.isValid(orderId) ||
      !orderLineId || !mongoose.Types.ObjectId.isValid(orderLineId))
      return Promise.reject(error.invalidId);


    const OrderModel = require('./order.model');
    const _orderModel = new OrderModel(this.test);

    _orderModel.model.findById(mongoose.Types.ObjectId(orderId)).lean()
      .then(res => {
        if (!res)
          return Promise.reject(error.orderNotFound);

        return this.requestOnlineWarehouse(res, orderLineId, user);

      })



  }

  requestOnlineWarehouse(orderId, orderLineId, user) {
    if (this.test)
      return Promise.resolve();

    if (!orderId || !orderLineId)
      return Promise.reject(error.orderLineNotFound);

    if (!mongoose.Types.ObjectId.isValid(orderId) || !mongoose.Types.ObjectId.isValid(orderLineId))
      return Promise.reject(error.invalidId);

    return new OrderModel(this.test).model.findById(mongoose.Types.ObjectId(orderId)).lean()
      .then(order => {

        let foundOrderLine = order.order_lines.find(x => x._id.toString() === orderLineId);
        let productId = foundOrderLine.product_id;
        let productInstanceId = foundOrderLine.product_instance_id;

        let productInstance;

        return new ProductModel(this.test).getInstance(productId.toString(), productInstanceId.toString())
      })
      .then(res => {
        if (!res || !res.barcode)
          return Promise.reject(error.productInstanceNotExist);

        return helpers.httpPost(env.onlineWarehouseAPI, {
          orderId: order._id.toString(),
          orderLineId: orderLineId.toString(),
          warehouseId: user.warehouse_id.toString(),
          userId: user.id.toString(),
          barcode: res.barcode
        });
      })
  }

  verifyOnlineWarehouse(body) {

    let query;
    let order;

    const OrderModel = require('./order.model');
    const _orderModel = new OrderModel(this.test);

    if (!body.orderId || !mongoose.Types.ObjectId.isValid(body.orderId) ||
      !body.orderLineId || !mongoose.Types.ObjectId.isValid(body.orderLineId) ||
      !body.userId || !mongoose.Types.ObjectId.isValid(body.userId) ||
      !body.warehouseId || !mongoose.Types.ObjectId.isValid(body.warehouseId)
    ) {
      return Promise.reject(error.invalidId);
    }


    return _orderModel.OrderModel.findById(mongoose.Types.ObjectId(body.orderId)).lean()
    .then(order => {

      if (!order)
        return Promise.reject(error.orderNotFound);
      let foundOrderLine = order.order_lines.find(x => x._id.toString() === body.orderLineId);

      if (!foundOrderLine)
        return Promise.reject(error.orderLineNotFound);

      let foundActiveTicket = foundOrderLine.tickets.find(x => !x.is_processed)
      if (!foundActiveTicket || foundActiveTicket.status !== _const.ORDER_STATUS.WaitForOnlineWarehouse)
        return Promise.reject(error.activeTicketNotFound);

        return new DSSModel(false).UIandSAOVD(order, foundOrderLine, body.userId, body.warehouseId);
    });

    
  }


  manualRequestInvoice(orderId, orderLineId, user) {

    if (!orderId || !mongoose.Types.ObjectId.isValid(orderId) ||
      !orderLineId || !mongoose.Types.ObjectId.isValid(orderLineId))
      return Promise.reject(error.invalidId);


    const OrderModel = require('./order.model');
    const _orderModel = new OrderModel(this.test);

    _orderModel.model.findById(mongoose.Types.ObjectId(orderId)).lean()
      .then(res => {
        if (!res)
          return Promise.reject(error.orderNotFound);

        return this.requestInvoice(res, orderLineId, user.warehouse_id, user.id);

      })



  }

  requestInvoice(orderId, orderLineId, warehouseId, userId) {

    if (this.test)
      return Promise.resolve();

    if (!orderId || !orderLineId)
      return Promise.reject(error.orderLineNotFound);

    if (!mongoose.Types.ObjectId.isValid(orderId) || !mongoose.Types.ObjectId.isValid(orderLineId))
      return Promise.reject(error.invalidId);

    return new OrderModel(this.test).model.findById(mongoose.Types.ObjectId(orderId)).lean()
      .then(order => {

        let foundOrderLine = order.order_lines.find(x => x._id.toString() === orderLineId);
        let productId = foundOrderLine.product_id;
        let productInstanceId = foundOrderLine.product_instance_id;

        let customer, productInstance;

        return new ProductModel(this.test).getInstance(productId.toString(), productInstanceId.toString())
      }).then(res => {
        if (!res || !res.barcode)
          return Promise.reject(error.productInstanceNotExist);

        productInstance = res;
        return new CustomerModel(this.test).getById(order.customer_id);
      })
      .then(res => {
        customer = res;
        if (!customer || !customer.mobile_no)
          return Promise.reject(error.noUsernameMobileNo);

        return helpers.httpPost(env.invoiceAPI, {
          orderId: order._id.toString(),
          orderLineId: orderLineId.toString(),
          warehouseId: warehouseId.toString(),
          userId: userId.toString(),
          mobileNo: customer.mobile_no,
          barcode: productInstance.barcode,
          usedPoint: order.used_point,
          usedBalance: order.used_balance,
          paidPrice: foundOrderLine.paid_price
        });
      })
  }

  verifyInvoice(body) {

    let query;
    let order;


    if (!body.warehouseId || !mongoose.Types.ObjectId.isValid(body.warehouseId) ||
      !body.orderId || !mongoose.Types.ObjectId.isValid(body.orderId) ||
      !body.orderLineId || !mongoose.Types.ObjectId.isValid(body.orderLineId) ||
      !body.userId || !mongoose.Types.ObjectId.isValid(body.userId) ||
      !body.mobileNo || !body.hasOwnProperty('point') || !body.hasOwnProperty('balance')) {
      return Promise.reject(error.invalidId);
    }

    const OrderModel = require('./order.model');
    const _orderModel = new OrderModel(this.test);


    return _orderModel.model.findById(mongoose.Types.ObjectId(body.orderId)).lean()
      .then(res => {

        if (!res)
          return Promise.reject(error.orderNotFound);

        let foundOrderLine = res.order_lines.find(x => x._id.toString() === body.orderLineId);

        if (!foundOrderLine)
          return Promise.reject(error.orderLineNotFound);

        let foundActiveTicket = foundOrderLine.tickets.find(x => !x.is_processed)
        if (!foundActiveTicket || foundActiveTicket.status !== _const.ORDER_STATUS.WaitForInvoice)
          return Promise.reject(error.noAccess);

        return new CustomerModel(this.test).updateByOfflineSystem(body.mobileNo, body.point, body.balance)
      })
      .then(res => {
        let user = {
          id: body.userId,
          warehouse_id: body.warehouseId
        };

        return _orderModel.setManualTicket('deliver', body, user);
      })
  }



  

}

module.exports = Offline;

