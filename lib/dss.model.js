const error = require('./errors.list');
const mongoose = require('mongoose');
const WarehouseModel = require('./warehouse.model');
const ProductModel = require('./product.model');
const socket = require('../socket');
const _const = require('./const.list');
const Delivery = require('./delivery.model');

class DSS {

  constructor(test) {
    this.test = test;
  }

  startProcess(order) {
    return new WarehouseModel(this.test).getAll()
      .then(warehouses => {
        if (!order)
          return Promise.reject(error.orderNotFound);

        if (!order.address)
          return Promise.reject(error.addressIsRequired);

        let promises = [];

        if (!order.is_collect) {
          order.order_lines.forEach(x => {
            promises.push(() => this.ORP(order, x, warehouses))
          });
        }
        else {
          order.order_lines.forEach(x => {
            promises.push(() => this.processCC(order, x, warehouses))
          });
        }
        return promises.reduce((x, y) => x.then(y), Promise.resolve());
      })
      .then(res => {
        return Promise.resolve('successfull');
      })

  }


  processCC(order, order_line, warehouses) {
    let CCWarehouse = warehouses.filter(x => !x.is_hub).find(x => x.address._id.toString() === order.address._id.toString());

    const Ticket = require('./ticket.model');

    return new ProductModel(this.test).getInstance(order_line.product_id.toString(), order_line.product_instance_id.toString())
      .then(productInstance => {

        if (!productInstance)
          return Promise.reject(error.productInstanceNotExist);

        let foundInventory = productInstance.inventory.find(x => x.warehouse_id.toString() === CCWarehouse._id.toString() && (x.count - x.reserved > 0));
        if (foundInventory) {
          return new Ticket(this.test).setAsReserved(order, order_line, CCWarehouse);
        }
        else {
          return this.ORP(order, order_line, warehouses, CCWarehouse._id)
        }
      })
  }

  ORP(order, order_line, warehouses, exceptionId = null) {
    if (exceptionId &&
      !warehouses.filter(el => el.has_customer_pickup && !el.is_hub)
        .map(x => x._id.toString()).includes(exceptionId.toString()))
      return Promise.reject(error.invalidWarehouseORPFailed);

    let filteredWarehouses = exceptionId ? warehouses.filter(x => x._id.toString() !== exceptionId.toString() && !x.is_hub)
      : warehouses.filter(x => !x.is_hub);

    const Ticket = require('./ticket.model');

    return new ProductModel(this.test).getInstance(order_line.product_id.toString(), order_line.product_instance_id.toString())
      .then(productInstance => {

        if (!productInstance)
          return Promise.reject(error.productInstanceNotExist);

        let warehouse;

        for (let i = 0; i < filteredWarehouses.length; i++) {
          let foundInventory = productInstance.inventory.find(x => {
            return x.warehouse_id.toString() === filteredWarehouses[i]._id.toString() && (x.count - x.reserved > 0)
          });
          if (foundInventory) {
            warehouse = filteredWarehouses[i];
            break;
          }
        }
        if (!warehouse) {
          return new Ticket(this.test).setAsNotExists(order, order_line);
        }
        else {
          return new Ticket(this.test).setAsReserved(order, order_line, warehouse)
            .then(res => {
              let dest;
              if (order.is_collect) {
                dest = filteredWarehouses.find(x => x.address._id.toString() === order.address._id.toString());
                if (!dest && !exceptionId)
                  return Promise.reject(error.WarehouseNotFound);
              }
              if (!order.is_collect || (order.is_collect && (!dest || dest._id.toString() !== warehouse._id.toString())))
                return new Delivery(this.test).initiate(order, order_line._id, {warehouse_id: warehouse._id.toString()}, {warehouse_id: warehouses.find(el => el.is_hub)._id.toString()});

              return Promise.resolve();
            });
        }
      });
  }

  afterOnlineWarehouseVerification(orderId, orderLineId, userId, warehouseId) {

    const OrderModel = require('./order.model');
    const TicketModel = require('./ticket.model');
    let foundOrder, foundOrderLine;
    return new OrderModel(this.test).model.findById(mongoose.Types.ObjectId(orderId)).lean()
      .then(res => {
        foundOrder = res;
        if (!foundOrder)
          return Promise.reject(error.orderNotFound);

        foundOrderLine = foundOrder.order_lines.find(x => x._id.toString() === orderLineId.toString());

        if (!foundOrderLine)
          return Promise.reject(error.orderLineNotFound);

        const lastTicket = foundOrderLine.tickets && foundOrderLine.tickets.length ? foundOrderLine.tickets[foundOrderLine.tickets.length - 1] : null;
        if (!lastTicket || lastTicket.is_processed || lastTicket.status !== _const.ORDER_STATUS.WaitForOnlineWarehouse)
          return Promise.reject(error.noAccess);

        return new TicketModel(this.test).setAsSoldOut(foundOrder, foundOrderLine, userId, warehouseId)
      })
      .then(res => this.afterSoldOut(foundOrder, foundOrderLine, userId, warehouseId))
      .then(res => {
        socket.sendToNS(warehouseId);
      })

  }

  afterInvoiceVerification(orderId, invoiceNo, userId, warehouseId) {

    const OrderModel = require('./order.model');
    let foundOrder;
    let warehouses, hub, destination;
    const TicketModel = require('./ticket.model');

    return new WarehouseModel(this.test).getAll()
      .then(res => {
        warehouses = res;
        hub = warehouses.find(x => x.is_hub);

        return new OrderModel(this.test).model.findOne({
          $and: [
            {_id: mongoose.Types.ObjectId(orderId)},
            {invoice_no: {$exists: false}}
          ]
        })
      })
      .then(res => {

        if (!res)
          return Promise.reject(error.orderNotFound);

        if (warehouseId.toString() === hub._id.toString() && res.is_collect)
          return Promise.reject(error.noAccess);


        foundOrder = res;

        if (foundOrder.is_collect)
          destination = warehouses.find(x => x.address._id.toString() === foundOrder.address._id.toString())

        if (destination && destination._id.toString() !== warehouseId.toString())
          return Promise.reject(error.noAccess);

        return new OrderModel(this.test).model.findOneAndUpdate({
          _id: foundOrder._id
        }, {
            invoice_no: invoiceNo
          })
      })
      .then(res => {
        return Promise.all(foundOrder.order_lines.map(orderLine => new TicketModel(this.test).setTicket(foundOrder, orderLine, _const.ORDER_STATUS.InvoiceVerified, userId, warehouseId)))
      })
      .then(res => {
        if (foundOrder.is_collect) {
          return Promise.all(foundOrder.order_lines.map(orderLine => new TicketModel(this.test).setTicket(foundOrder, orderLine, _const.ORDER_STATUS.Delivered, userId, warehouseId, null, true)))
        } else {
          return Promise.all(foundOrder.order_lines.map(orderLine => new TicketModel(this.test).setTicket(foundOrder, orderLine, _const.ORDER_STATUS.ReadyToDeliver, userId, warehouseId)));
        }
      })
      .then(res => {
        socket.sendToNS(warehouseId);
      })


  }

  afterSoldOut(order, orderLine, userId, warehouseId) {
    const Ticket = require('./ticket.model');
    const TicketModel = new Ticket(this.test);

    return TicketModel.setTicket(order, orderLine, _const.ORDER_STATUS.WaitForAggregation, userId, warehouseId)
      .then(res => {
        order = res.order;
        orderLine = res.orderLine;
        return this.checkOrderAggregation(order, warehouseId)
      })
      .then(isCompleted => {
        if (isCompleted) {
          return new WarehouseModel(this.test).getAll()
            .then(res => {
              const dest = res.find(x => x.address._id.toString() === order.address._id.toString());

              if (order.is_collect && dest._id.toString() === warehouseId.toString())
                return Promise.all(order.order_lines.map(ol => TicketModel.setTicket(order, ol, _const.ORDER_STATUS.ReadyForInvoice, userId, warehouseId)));
              else
                return Promise.all(order.order_lines
                  .filter(el => el.tickets.length && el.tickets.slice(-1)[0].receiver_id.toString() === warehouseId.toString())
                  .map(ol => TicketModel.setTicket(order, ol, _const.ORDER_STATUS.ReadyToDeliver, userId, warehouseId)));
            });
        }
        else {
          return TicketModel.setTicket(order, orderLine, _const.ORDER_STATUS.WaitForAggregation, userId, warehouseId);
        }
      });
  }

  afterScan(order, product, user) {
    if (!order)
      return Promise.reject(error.orderNotFound);

    const foundOrderLine = order.order_lines.find(x => {
      if (x.product_instance_id.toString() === product.instance._id.toString()) {
        const lastTicket = x.tickets && x.tickets.length ? x.tickets[x.tickets.length - 1] : null;
        return lastTicket && !lastTicket.is_processed && lastTicket.receiver_id.toString() === user.warehouse_id.toString() &&
          [
            _const.ORDER_STATUS.default,
            _const.ORDER_STATUS.WaitForOnlineWarehouse,
            _const.ORDER_STATUS.ReadyForInvoice,
            _const.ORDER_STATUS.Delivered,
          ].includes(lastTicket.status);
      } else
        return false;
    })
    if (!foundOrderLine)
      return Promise.reject(error.orderLineNotFound);

    const lastTicket = foundOrderLine.tickets && foundOrderLine.tickets.length ? foundOrderLine.tickets[foundOrderLine.tickets.length - 1] : null;

    if (!lastTicket || lastTicket.is_processed)
      return Promise.reject(error.activeTicketNotFound);

    if (lastTicket.status === _const.ORDER_STATUS.default || lastTicket.status === _const.ORDER_STATUS.WaitForOnlineWarehouse) { // scan is for newly paid order line
      const TicketAction = require('./ticket_action.model');
      return new TicketAction(this.test).requestOnlineWarehouse(order, foundOrderLine, user);
    }
    else if (lastTicket.status === _const.ORDER_STATUS.Delivered) { // scan is for received order line
      return this.afterReceive(order, foundOrderLine, user)
    }
  }

  afterReceive(order, orderLine, user) {

    const Ticket = require('./ticket.model');

    return new WarehouseModel(this.test).getAll()
      .then(res => {

        const hub = res.find(x => x.is_hub);
        if (user.warehouse_id === hub._id.toString()) { // is hub

          return new Ticket(this.test).setTicket(order, orderLine, _const.ORDER_STATUS.WaitForAggregation, user.id, hub._id)
            .then(res => {
              order = res.order;
              orderLine = res.orderLine;
              return this.checkOrderAggregation(order, hub._id)
            })
            .then(isCompleted => {
              if (isCompleted) {
                const TicketModel = new Ticket(this.test);

                if (order.is_collect) {
                  return Promise.all(order.order_lines
                    .filter(el => el.tickets.length && el.tickets.slice(-1)[0].receiver_id.toString() === hub._id.toString())
                    .map(ol => TicketModel.setTicket(order, ol, _const.ORDER_STATUS.ReadyToDeliver, user.warehouse_id, user.warehouse_id)));
                } else {
                  return Promise.all(order.order_lines.map(ol => TicketModel.setTicket(order, ol, _const.ORDER_STATUS.ReadyForInvoice, user.warehouse_id, user.warehouse_id)))
                }
              } else {
                return Promise.resolve();
                // return new Ticket(this.test).setTicket(order, orderLine, _const.ORDER_STATUS.WaitForAggregation, user.id, user.warehouse_id);
              }
            })
            .then(data => {
              const warehouseId = res.find(el => el.address._id.toString() === order.address._id.toString());

              return new Delivery(this.test).initiate(
                order,
                orderLine._id,
                {warehouse_id: user.warehouse_id},
                warehouseId ? {warehouse_id: warehouseId._id} : {
                  customer: {
                    _id: order.customer_id,
                    address_id: order.address._id
                  }
                });
            })
            .then(res => {
              return new Delivery(this.test).makeDeliveryShelfCode(res._id);
            })

        } else { // is shop

          if (!order.is_collect)
            return Promise.reject(error.noAccess);

          return new Ticket(this.test).setTicket(order, orderLine, _const.ORDER_STATUS.WaitForAggregation, user.id, user.warehouse_id)
            .then(res => {
              order = res.order;
              orderLine = res.orderLine;
              return this.checkOrderAggregation(order, user.warehouse_id)
            })
            .then(isCompleted => {
              const TicketModel = new Ticket(this.test);
              if (isCompleted) {
                return Promise.all(order.order_lines.map(ol => TicketModel.setTicket(order, ol, _const.ORDER_STATUS.ReadyForInvoice, user.warehouse_id, user.warehouse_id)))
              } else {
                return Promise.resolve();
              }
            });

        }
      })
      .then(res => {
        socket.sendToNS(user.warehouse_id);
        return Promise.resolve(res);
      })
  }

  checkOrderAggregation(order, warehouseId) {

    const checkAllInWarehouse = () => {

      if (order.order_lines.length === 1)
        return Promise.resolve(true);

      return Promise.resolve(order.order_lines.filter(ol => {
        const lastTicket = ol.tickets && ol.tickets.length ? ol.tickets[ol.tickets.length - 1] : null;
        if (!lastTicket)
          return false;

        return lastTicket.receiver_id.toString() === warehouseId.toString();
      })
        .every(ol => {
          const lastTicket = ol.tickets && ol.tickets.length ? ol.tickets[ol.tickets.length - 1] : null;
          if (!lastTicket)
            return false;

          return lastTicket.status === _const.ORDER_STATUS.WaitForAggregation
        }))
    }

    const checkAllMustBeInWarehouse = (targetId) => {

      if (order.order_lines.length === 1)
        return Promise.resolve(true);

      return Promise.resolve(order.order_lines.every(ol => {
        const lastTicket = ol.tickets && ol.tickets.length ? ol.tickets[ol.tickets.length - 1] : null;

        return lastTicket &&
          !lastTicket.is_processed &&
          lastTicket.status === _const.ORDER_STATUS.WaitForAggregation &&
          (lastTicket.receiver_id.toString() === targetId.toString());
      }));
    }

    const checkAllExceptInDist = () => {
      return Promise.resolve(order.order_lines.every(ol => {
        const lastTicket = ol.tickets && ol.tickets.length ? ol.tickets[ol.tickets.length - 1] : null;

        if (!lastTicket || lastTicket.is_processed)
          return false;

        return lastTicket.status === _const.ORDER_STATUS.WaitForAggregation &&
          (lastTicket.receiver_id.toString() === hub._id.toString() ||
            lastTicket.receiver_id.toString() === destination._id.toString());  // all order lines are whether in hub or in destination)
      }))
    }

    let hub = null;
    let destination = null;

    return new WarehouseModel(this.test).getAll()
      .then(warehouses => {

        destination = order.is_collect ? warehouses.find(x => x.address._id.toString() === order.address._id.toString()) : order.address;
        hub = warehouses.find(x => x.is_hub);
        if (!destination || !hub)
          return Promise.reject(error.WarehouseNotFound);

        if (order.is_collect) { // is collect ?
          const is_destination = destination._id.toString() === warehouseId.toString();

          if (is_destination) { // is in destination
            return checkAllMustBeInWarehouse(destination._id);
          } else {
            const is_hub = hub._id.toString() === warehouseId.toString();
            if (is_hub) { // is in hub
              return checkAllExceptInDist();

            } else { // some where not in hub or destination
              return checkAllInWarehouse();
            }
          }

        } else { // not C&C
          const is_hub = hub._id.toString() === warehouseId.toString();
          if (is_hub) { // is in hub
            return checkAllMustBeInWarehouse(hub._id);
          }
          else {  // not in hub
            return checkAllInWarehouse();
          }
        }

      });
  }

}


module
  .
  exports = DSS;

