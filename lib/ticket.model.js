const error = require('./errors.list');
const mongoose = require('mongoose');
const WarehouseModel = require('./warehouse.model');
const ProductModel = require('./product.model');
const CustomerModel = require('./customer.model');
const helpers = require('./helpers');
const _const = require('./const.list');
const env = require('../env');
const socket = require('../socket');
const AgentModel = require('./agent.model');
const moment = require('moment');



/**
 * this class used either by ticketAction or DSS class
 * order and order line must not be queried here. meaning that instance of order and order line are always passed to set ticket method.
 */
class Ticket {

  constructor(test) {
    this.test = test;
  }

  closeCurrentTicket(order, orderLine, userId) {

    if (orderLine.tickets.length && !userId)
      return Promise.reject(error.noUser);

    const Order = require('./order.model');
    let query = {
      _id: order._id
    }
    return new Order(this.test).model.update(query, {
      '$set': {
        'order_lines.$[i].tickets.$[j].is_processed': true,
        'order_lines.$[i].tickets.$[j].agent_id': userId,
      }
    }, {
      arrayFilters: [{
          'i._id': orderLine._id
        },
        {
          'j.is_processed': false
        }
      ]
    })

  }

  /**
   * 
   * @param {*} order
   * @param {*} orderLine 
   * @param {*} status 
   * @param {*} receiverId : receiver might be warehosue or agents
   * @param {*} desc : some tickets such as delivery needs this field
   */
  addNewTicket(order, orderLine, status, receiverId, desc = null, isLastTicket = false, userId = null) {

    if (!receiverId)
      return Promise.reject(error.ticketReceiverRequired)

    let query = {
      '_id': mongoose.Types.ObjectId(order._id),
      'order_lines._id': mongoose.Types.ObjectId(orderLine._id)
    };

    let update = {
      'status': status,
      'desc': desc
    };
    if (receiverId)
      update['receiver_id'] = mongoose.Types.ObjectId(receiverId);

    if (isLastTicket && userId) {
      update['is_processed'] = true;
      update['agent_id'] = userId;
    }
    let newTicketUpdate = {
      '$addToSet': {
        'order_lines.$.tickets': update
      }
    };

    const Order = require('./order.model');

    return new Order(this.test).model.findOneAndUpdate(query, newTicketUpdate, {
      new: true
    }).lean();
    

  }

  setTicket(order, orderLine, status, userId, receiverId, desc = null, isLastTicket = false) {

    if (!order)
      return Promise.reject(error.orderNotFound);

    if (!orderLine)
      return Promise.reject(error.orderLineNotFound);


    const lastTicket = orderLine.tickets && orderLine.tickets.length ? orderLine.tickets[orderLine.tickets.length - 1] : null;
    if (lastTicket && !lastTicket.is_processed && lastTicket.status === status)
      return Promise.resolve();

    if (!Object.values(_const.ORDER_STATUS).find(x => x === status))
      return Promise.reject(error.invalidTicket)

    return this.closeCurrentTicket(order, orderLine, userId)
      .then(res => this.addNewTicket(order, orderLine, status, receiverId, null, isLastTicket, userId))
      .then(res => {
        order = res;
        orderLine = res.order_lines.find(el => el._id.toString() === orderLine._id.toString());
        return Promise.resolve({
          order,
          orderLine
        });
      });
  }


  setAsNotExists(order, order_line) {

    const TicketModel = require('./ticket.model');

    return new AgentModel(this.test).getSalesManager()
      .then(salesManager => {
        if (!salesManager) {
          return Promise.reject(error.salesManagerNotFound)
        }
        return new TicketModel(this.test).setTicket(order, order_line, _const.ORDER_STATUS.NotExists, null, salesManager._id)
          .then(res => {
            socket.sendToNS(salesManager._id)
          })
      })

  }

  setAsReserved(order, order_line, prefferedWarehouse) {

    return new ProductModel(this.test).setInventory({
        id: order_line.product_id,
        productInstanceId: order_line.product_instance_id,
        warehouseId: prefferedWarehouse._id,
        delReserved: 1
      })
      .then(res => {
        if (res && res.n === 1 && res.nModified === 1) {
          this.setTicket(order, order_line, _const.ORDER_STATUS.default, null, prefferedWarehouse._id)
        } else {
          return Promise.reject(error.invalidInventoryCount);
        }
      })
      .then(res => {
        socket.sendToNS(prefferedWarehouse._id)
      })
  }

  /**
   * set order line as sold out meaning that remove its reserved flag and minus its count by 1 from inventrory
   * @param {*} order 
   * @param {*} order_line 
   * @param {*} userId 
   * @param {*} warehouseId 
   */
  setAsSoldOut(order, orderLine, userId, warehouseId) {
    return new ProductModel(this.test).setInventory({
        id: orderLine.product_id.toString(),
        productInstanceId: orderLine.product_instance_id.toString(),
        warehouseId: warehouseId,
        delCount: -1,
        delReserved: -1
      })
      .then(res => {
        if (res && res.n === 1 && res.nModified === 1) {
          return Promise.resolve();
        } else {
          return Promise.reject(error.invalidInventoryCount);
        }

      })
  }

  search(options, offset, limit, user) {

    let search;



    if (options && options.type === 'inbox') {
      if (!user.warehouse_id)
        return Promise.reject(error.ticketReceiverRequired);

      search = this.searchInbox(user.warehouse_id, offset, limit, user.access_level);
    }

    if (options && options.type === 'outbox') {
      if (!user.warehouse_id)
        return Promise.reject(error.ticketReceiverRequired);
      // when acess_level is sales manager we excepted that return all orders without any conditions
      if(user.access_level === _const.ACCESS_LEVEL.SalesManager) {
        search = this.searchOutboxSalesManager(options, offset, limit);
      } else {
        search = this.searchOutbox(user.warehouse_id, offset, limit, options);
      }



    }

    if (!search || !search.mainQuery || !search.countQuery)
      return Promise.reject(error.invalidSearchQuery);

    let result;
    const Order = require('./order.model');

    return new Order(this.test).model.aggregate(search.mainQuery).then(res => {
        result = res;
        return new Order(this.test).model.aggregate(search.countQuery)

      })
      .then(res => {
        let totalCount = res[0] ? res[0].count : 0;
        return Promise.resolve({
          data: result,
          total: totalCount,
        });
      });
  }

  // this function call when access level is sales manager
  // this function get 'body' includes
  // { invoiceNo, transferee, addingTime, status }
  searchOutboxSalesManager(body ,offset, limit) {
    
    // create object for push new query
    let conditonInvoiceNo = {
      $and: [{
          is_cart: false
        },
        {
          transaction_id: {
            $ne: null
          }
        }
      ]
    };
    let conditonaddingTime = {};
    let conditonStatus = {};
    let conditonTransferee = {
      $or: []
    };
  
    // invoiceNo 
    if (body.hasOwnProperty('invoiceNo') && body.invoiceNo) {
      conditonInvoiceNo.$and.push({'invoice_no':  new RegExp('.*' + body.invoiceNo + '.*', 'i')});
    }
    // transferee 
    if (body.hasOwnProperty('transferee') && body.transferee) {
      conditonTransferee.$or.push({
        $or: [
          {'customer.name':  new RegExp('.*' + body.transferee+ '.*', 'i')},
          {'customer.surname':  new RegExp('.*' + body.transferee + '.*', 'i')},
          {'receiver_agent.first_name':  new RegExp('.*' + body.transferee + '.*', 'i')},
          {'receiver_agent.surname':  new RegExp('.*' + body.transferee + '.*', 'i')},
        ]
      })
    } else delete conditonTransferee.$or

    if (body.hasOwnProperty('addingTime') && body.addingTime) {
      conditonaddingTime = {'order_lines.adding_time': {$gte: new Date(moment(body.addingTime).format('YYYY-MM-DD'))}}
    }
    // status
    if (body.hasOwnProperty('status') && body.status) {
      conditonStatus = {'last_ticket.status' : body.status}
    }

   


    const result = {
      mainQuery: [],
      countQuery: []
    };
    
    result.mainQuery = [
      {
        $match: conditonInvoiceNo
      },
      {
        $lookup: {
          from: 'customer',
          localField: 'customer_id',
          foreignField: '_id',
          as: 'customer'
        }
      },
      {
        $addFields: {
          'total_order_lines': {
            $size: '$order_lines'
          }
        }
      },
      {
        $unwind: {
          path: '$customer',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$order_lines',
          preserveNullAndEmptyArrays: true
        }
      },
      // adding time check
      {
        $match: conditonaddingTime
      },
      {
        $addFields: {
          'last_ticket': {
            "$arrayElemAt": ["$order_lines.tickets", -1]
          }
        }
      },
      // status check
      {
        $match: conditonStatus
      },
   
      {
        $unwind: {
          path: '$order_lines.tickets',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "agent",
          localField: "order_lines.tickets.receiver_id",
          foreignField: "_id",
          as: "receiver_agent"
        }
      },
      {
        $lookup: {
          from: "warehouse",
          localField: "order_lines.tickets.receiver_id",
          foreignField: "_id",
          as: "receiver_warehouse"
        }
      },
      
      // transferee
      // include customer, delivery agent
      {
        $match: conditonTransferee
      },
      {
        $lookup: {
          from: 'product',
          localField: 'order_lines.product_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $unwind: {
          path: '$product',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$product.instances', // it makes product.instances, single element array for each instance
          preserveNullAndEmptyArrays: true
        }
      },
      // transferee
      // {
      //   $match: conditonTransferee
      // },
      {
        $project: {
          _id: 1,
          transaction_id: 1,
          total_amount: 1,
          used_point: 1,
          used_balance: 1,
          is_collect: 1,
          order_time: 1,
          order_line_id: '$order_lines._id',
          adding_time: '$order_lines.adding_time',
          tickets: '$order_lines.tickets',
          product_colors: '$product.colors',
          total_order_lines: '$total_order_lines',
          address: 1,
          customer: {
            '_id': '$customer._id',
            'name': '$customer.first_name',
            'surname': '$customer.surname',
            'addresses': '$customer.addresses'
          },
          receiver_warehouse: "$receiver_warehouse",
          receiver_agent: "$receiver_agent",
          instance: {
            '_id': '$product.instances._id',
            'product_id': '$product._id',
            'product_name': '$product.name',
            'barcode': '$product.instances.barcode',
            'size': '$product.instances.size',
            'product_color_id': '$product.instances.product_color_id'
          },
          cmp_value: {
            $cmp: ['$order_lines.product_instance_id', '$product.instances._id']
          }
        }
      },
      {
        $match: {
          cmp_value: {
            $eq: 0
          }
        }
      },
      {
        '$group': {
            _id: '$order_line_id',
            order_id: {
                '$first': '$_id'
            },
            tickets: {
                '$push': '$tickets'
            },
            instance: {
                '$push': '$instance'
            },
            product_colors: {
                '$push': '$product_colors'
            },

            customer: {
                '$first': '$customer'
            },
            transaction_id: {
                '$first': '$transaction_id'
            },
            used_point: {
                '$first': '$used_point'
            },
            used_balance: {
                '$first': '$used_balance'
            },
            is_collect: {
                '$first': '$is_collect'
            },
            address: {
                '$first': '$address'
            },
            order_time: {
                '$first': '$order_time'
            },
            total_amount: {
                '$first': '$total_amount'
            },
            total_order_lines: {
                '$first': '$total_order_lines'
            },
            order_line_id: {
                '$first': '$order_line_id'
            }
        }
    }, {
        '$group': {
            _id: '$order_id',
            order_lines: {
              $push: {
                order_line_id: '$order_line_id',
                adding_time: '$adding_time',
                tickets: '$tickets',
                product_colors: '$product_colors',
                instance: '$instance',
              }
            },

            customer: {
                '$first': '$customer'
            },
            transaction_id: {
                '$first': '$transaction_id'
            },
            used_point: {
                '$first': '$used_point'
            },
            used_balance: {
                '$first': '$used_balance'
            },
            is_collect: {
                '$first': '$is_collect'
            },
            address: {
                '$first': '$address'
            },
            order_time: {
                '$first': '$order_time'
            },
            total_amount: {
                '$first': '$total_amount'
            },
            total_order_lines: {
                '$first': '$total_order_lines'
            }
        }
    },
      {
        $sort: {
          'order_time': 1,
        }
      },
      {
        $skip: Number.parseInt(offset)
      },
      {
        $limit: Number.parseInt(limit)
      }
    ]

    result.countQuery = [
      // InvoiceNo check
      {
        $match: conditonInvoiceNo
      },
      {
        $unwind: {
          path: '$order_lines',
          preserveNullAndEmptyArrays: true
        }
      },
      // adding time check
      {
        $match: conditonaddingTime
      },
      {
        $addFields: {
          'last_ticket': {
            "$arrayElemAt": ["$order_lines.tickets", -1]
          }
        }
      },
      // status check
      {
        $match: conditonStatus
      },
      {
        $unwind: {
          path: '$order_lines.tickets',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "agent",
          localField: "order_lines.tickets.receiver_id",
          foreignField: "_id",
          as: "receiver_agent"
        }
      },
      {
        $lookup: {
          from: "warehouse",
          localField: "order_lines.tickets.receiver_id",
          foreignField: "_id",
          as: "receiver_warehouse"
        }
      },
      // transferee
      // include customer, delivery agent
      {
        $match: conditonTransferee
      },
      {
        $group: {
          _id: '$_id'
        }
      },
      {
        $count: 'count'
      }
    ]


    return result;
  }

  searchInbox(receiverId, offset, limit, accessLevel) {

    let addMatchCheckSalesManager = {
      $match: {
        $and: [{
            'last_ticket.is_processed': false
          },
          {
            'last_ticket.receiver_id': {
              $eq: mongoose.Types.ObjectId(receiverId)
            }
          },
          {
            'last_ticket.status': {
              $nin: [
                 _const.ORDER_STATUS.ReadyToDeliver,
                 _const.ORDER_STATUS.DeliverySet,
                 _const.ORDER_STATUS.OnDelivery
              ]
            }
          },
        ]
      }
    };
    
    const result = {
      mainQuery: [],
      countQuery: []
    };

    result.mainQuery = [

      {
        $match: {
          $and: [{
              is_cart: false
            },
            {
              transaction_id: {
                $ne: null
              }
            },
          ]
        }
      },
      {
        $lookup: {
          from: 'customer',
          localField: 'customer_id',
          foreignField: '_id',
          as: 'customer'
        }
      },
      {
        $addFields: {
          'total_order_lines': {
            $size: '$order_lines'
          }
        }
      },
      {
        $unwind: {
          path: '$customer',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$order_lines',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          'last_ticket': {
            "$arrayElemAt": ["$order_lines.tickets", -1]
          }
        }
      },
      addMatchCheckSalesManager,
      {
        $lookup: {
          from: 'product',
          localField: 'order_lines.product_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $unwind: {
          path: '$product',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$product.instances', // it makes product.instances, single element array for each instance
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          transaction_id: 1,
          total_amount: 1,
          used_point: 1,
          used_balance: 1,
          is_collect: 1,
          order_time: 1,
          order_line_id: '$order_lines._id',
          adding_time: '$order_lines.adding_time',
          tickets: '$order_lines.tickets',
          product_colors: '$product.colors',
          total_order_lines: '$total_order_lines',
          address: 1,
          customer: {
            '_id': '$customer._id',
            'name': '$customer.first_name',
            'surname': '$customer.surname',
            'addresses': '$customer.addresses'
          },
          instance: {
            '_id': '$product.instances._id',
            'product_id': '$product._id',
            'product_name': '$product.name',
            'barcode': '$product.instances.barcode',
            'size': '$product.instances.size',
            'product_color_id': '$product.instances.product_color_id'
          },
          cmp_value: {
            $cmp: ['$order_lines.product_instance_id', '$product.instances._id']
          }
        }
      },
      {
        $match: {
          cmp_value: {
            $eq: 0
          }
        }
      },
      {
        $group: {
          _id: '$_id',
          customer: {
            $first: '$customer'
          },
          transaction_id: {
            $first: '$transaction_id'
          },
          used_point: {
            $first: '$used_point'
          },
          used_balance: {
            $first: '$used_balance'
          },
          is_collect: {
            $first: '$is_collect'
          },
          address: {
            $first: '$address'
          },
          order_time: {
            $first: '$order_time'
          },
          total_amount: {
            $first: '$total_amount'
          },
          total_order_lines: {
            $first: '$total_order_lines'
          },
          order_lines: {
            $push: {
              order_line_id: '$order_line_id',
              adding_time: '$adding_time',
              tickets: '$tickets',
              product_colors: '$product_colors',
              instance: '$instance',
            }
          }
        }
      },
      {
        $sort: {
          'order_time': 1,
        }
      },
      {
        $skip: Number.parseInt(offset)
      },
      {
        $limit: Number.parseInt(limit)
      }
    ]

    result.countQuery = [

      {
        $match: {
          $and: [{
              is_cart: false
            },
            {
              transaction_id: {
                $ne: null
              }
            },
          ]
        }
      },
      {
        $unwind: {
          path: '$order_lines',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          'last_ticket': {
            "$arrayElemAt": ["$order_lines.tickets", -1]
          }
        }
      },
      {
        $match: {
          $and: [{
              'last_ticket.is_processed': false
            },
            {
              'last_ticket.receiver_id': {
                $eq: mongoose.Types.ObjectId(receiverId)
              }
            },
            {
              'last_ticket.status': {
                $nin: [
                  _const.ORDER_STATUS.ReadyForInternalDelivery,
                  _const.ORDER_STATUS.OnInternalDelivery,
                  _const.ORDER_STATUS.ReadyToDeliver,
                  _const.ORDER_STATUS.OnDelivery,
                  _const.ORDER_STATUS.Delivered,

                ]
              }
            },
          ]
        }
      },
      {
        $group: {
          _id: '$_id'
        }
      },
      {
        $count: 'count'
      }
    ]


    return result;

  }

  searchOutbox(receiverId, offset, limit, body) {
    let optimizeQuery;
    if (body.hasOwnProperty('last_ticket') && body.last_ticket) {
      optimizeQuery = {
        $match: {
          $and: [
            {'order_lines.tickets.receiver_id': mongoose.Types.ObjectId(receiverId)},
            {"last_ticket.status":  _const.ORDER_STATUS.ReadyToDeliver},
          ]
        }
      };
    } else {
      optimizeQuery = {
        $match: {

          $and: [
            {'order_lines.tickets.receiver_id': mongoose.Types.ObjectId(receiverId)},
            {"last_ticket.status": {$ne: _const.ORDER_STATUS.ReadyToDeliver}},
            {"order_lines.tickets.status":  _const.ORDER_STATUS.ReadyToDeliver},
          ]
        }
      };
    }
    const result = {
      mainQuery: [],
      countQuery: []
    };
    result.mainQuery = [
      {
        $match: {
          $and: [
            {is_cart: false},
            {transaction_id: {$ne: null}},
          ]
        }
      },
      {
        $lookup: {
          from: 'customer',
          localField: 'customer_id',
          foreignField: '_id',
          as: 'customer'
        }
      },
      {
        $unwind: {
          path: '$customer',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          'total_order_lines': {
            $size: '$order_lines'
          }
        }
      },
      {
        $unwind: {
          path: '$order_lines',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {'last_ticket': {"$arrayElemAt": ["$order_lines.tickets", -1]}}
      },
      {
        $unwind: {
          path: '$last_ticket',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$order_lines.tickets',
          preserveNullAndEmptyArrays: true
        }
      },
      optimizeQuery,
      {
        $lookup: {
          from: 'product',
          localField: 'order_lines.product_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $unwind: {
          path: '$product',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$product.instances', // it makes product.instances, single element array for each instance
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          cartItems: 1,
          address: 1,
          customerData: 1,
          transaction_id: 1,
          used_point: 1,
          total_amount: 1,
          total_order_lines: '$total_order_lines',
          is_collect: 1,
          discount: 1,
          last_ticket: 1,
          used_balance: 1,
          order_time: 1,
          order_line_id: '$order_lines._id',
          paid_price: '$order_lines.paid_price',
          tickets: '$order_lines.tickets',
          product_colors: '$product.colors',
          customer: {
            '_id': '$customer._id',
            'name': '$customer.first_name',
            'surname': '$customer.surname',
            'addresses': '$customer.addresses'
          },
          instance: {
            '_id': '$product.instances._id',
            'product_id': '$product._id',
            'product_name': '$product.name',
            'barcode': '$product.instances.barcode',
            'size': '$product.instances.size',
            'product_color_id': '$product.instances.product_color_id'
          },
          cmp_value: {$cmp: ['$order_lines.product_instance_id', '$product.instances._id']}
        }
      },
      {
        $match: {
          cmp_value: {$eq: 0}
        }
      },
      {
        $group: {
          _id: '$order_line_id',
          order_id: {$first: '$_id'},  
          customer: {$first: '$customer'},
          last_ticket: {$first: '$last_ticket'},
          cart_items: {$first: 'cart_items'},
          address: {$first: '$address'},
          customerData: {$first: '$customerData'},
          transaction_id: {$first: '$transaction_id'},
          used_point: {$first: '$used_point'},
          total_amount: {$first: '$total_amount'},
          total_order_lines: {$first: '$total_order_lines'},
          is_collect: {$first: '$is_collect'},
          discount: {$first: '$discount'},
          used_balance: {$first: '$used_balance'},
          order_time: {$first: '$order_time'},
          product_colors: {$first: '$product.colors'},
          order_lines: {
            $first: {
              order_line_id: '$order_line_id',
              paid_price: '$order_lines.paid_price',
              tickets: '$tickets',
              product_colors: '$product_colors',
              instance: '$instance',
            }
          }
        }
      },
      {
        $group: {
          _id: '$order_id',
          customer: {$first: '$customer'},
          last_ticket: {$first: '$last_ticket'},
          cart_items: {$first: 'cart_items'},
          address: {$first: '$address'},
          customerData: {$first: '$customerData'},
          transaction_id: {$first: '$transaction_id'},
          used_point: {$first: '$used_point'},
          total_amount: {$first: '$total_amount'},
          total_order_lines: {$first: '$total_order_lines'},
          is_collect: {$first: '$is_collect'},
          discount: {$first: '$discount'},
          used_balance: {$first: '$used_balance'},
          order_time: {$first: '$order_time'},
          product_colors: {$first: '$product.colors'},
          order_lines: {
            $push: {
              order_line_id: '$order_lines.order_line_id',
              paid_price: '$order_lines.paid_price',
              tickets: '$order_lines.tickets',
              product_colors: '$order_lines.product_colors',
              instance: '$order_lines.instance',
            }
          }
        }
      },
      {
        $sort: {
          'last_ticket.timestamp': -1,
        }
      },
      {
        $skip: Number.parseInt(offset)
      },
      {
        $limit: Number.parseInt(limit)
      },
    ];
    result.countQuery = [
      {
        $match: {
          $and: [
            {is_cart: false},
            {transaction_id: {$ne: null}},
          ]
        }
      },
      {
        $lookup: {
          from: 'customer',
          localField: 'customer_id',
          foreignField: '_id',
          as: 'customer'
        }
      },
      {
        $unwind: {
          path: '$customer',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$order_lines',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {'last_ticket': {"$arrayElemAt": ["$order_lines.tickets", -1]}}
      },
      {
        $unwind: {
          path: '$last_ticket',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$order_lines.tickets',
          preserveNullAndEmptyArrays: true
        }
      },
      optimizeQuery,
      {
        $lookup: {
          from: 'product',
          localField: 'order_lines.product_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $unwind: {
          path: '$product',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$product.instances', // it makes product.instances, single element array for each instance
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          cartItems: 1,
          address: 1,
          customerData: 1,
          transaction_id: 1,
          used_point: 1,
          total_amount: 1,
          is_collect: 1,
          discount: 1,
          last_ticket: 1,
          used_balance: 1,
          order_time: 1,
          order_line_id: '$order_lines._id',
          paid_price: '$order_lines.paid_price',
          tickets: '$order_lines.tickets',
          product_colors: '$product.colors',
          customer: {
            '_id': '$customer._id',
            'name': '$customer.first_name',
            'surname': '$customer.surname',
            'addresses': '$customer.addresses'
          },
          instance: {
            '_id': '$product.instances._id',
            'product_id': '$product._id',
            'product_name': '$product.name',
            'barcode': '$product.instances.barcode',
            'size': '$product.instances.size',
            'product_color_id': '$product.instances.product_color_id'
          },
          cmp_value: {$cmp: ['$order_lines.product_instance_id', '$product.instances._id']}
        }
      },
      {
        $match: {
          cmp_value: {$eq: 0}
        }
      },
      {
        $group: {
          _id: '$_id',
          customer: {$first: '$customer'},
          last_ticket: {$first: '$last_ticket'},
          cart_items: {$first: 'cart_items'},
          address: {$first: '$address'},
          customerData: {$first: '$customerData'},
          transaction_id: {$first: '$transaction_id'},
          used_point: {$first: '$used_point'},
          total_amount: {$first: '$total_amount'},
          is_collect: {$first: '$is_collect'},
          discount: {$first: '$discount'},
          used_balance: {$first: '$used_balance'},
          order_time: {$first: '$order_time'},
          product_colors: {$first: '$product.colors'},
          order_lines: {
            $push: {
              order_line_id: '$order_line_id',
              paid_price: '$order_lines.paid_price',
              tickets: '$tickets',
              product_colors: '$product_colors',
              instance: '$instance',
            }
          }
        }
      },
      {
        $count: 'count'
      }
    ]
    return result;
  }


  getHistoryOrderLine(params) {

    let groupParams = {
      $push: {
        is_processed: '$order_line.tickets.is_processed',
        receiver_warehouse: "$receiver_warehouse",
        receiver_agent: "$receiver_agent",
        desc: "$order_line.tickets.desc",
        timestamp: "$order_line.tickets.timestamp",
        status: "$order_line.tickets.status",
        agent: "$agent"
      }
    };

    const Order = require('./order.model');

    if (!mongoose.Types.ObjectId.isValid(params.orderId) ||
      !mongoose.Types.ObjectId.isValid(params.orderLineId)) {
      return Promise.reject(error.invalidId);
    }
    return new Order(this.test).model.aggregate([{
        $match: {
          '_id': mongoose.Types.ObjectId(params.orderId),
        }
      },
      {
        $project: {
          order_line: {
            $filter: {
              input: "$order_lines",
              as: "order_line",
              cond: {
                $eq: ["$$order_line._id", mongoose.Types.ObjectId(params.orderLineId)],
              },
            },
          },
        }
      },
      {
        $unwind: '$order_line'
      },
      {
        $unwind: '$order_line.tickets'
      },
      {
        $lookup: {
          from: "agent",
          localField: "order_line.tickets.agent_id",
          foreignField: "_id",
          as: "agent"
        }
      },
      {
        $lookup: {
          from: "warehouse",
          localField: "order_line.tickets.receiver_id",
          foreignField: "_id",
          as: "receiver_warehouse"
        }
      },
      {
        $lookup: {
          from: "agent",
          localField: "order_line.tickets.receiver_id",
          foreignField: "_id",
          as: "receiver_agent"
        }
      },
      {
        $group: {
          _id: '$_id',
          tickets: groupParams,
        }
      },
      {
        $project: {
          _id: 1,
          tickets: {
            $filter: {
              input: "$tickets",
              as: "ticket",
              cond: {
                $ne: ["$$ticket", null],
              }
            },
          },
        }
      },

    ]);

  }

  getHistoryOrderByReceiver(params, user) {

    const Order = require('./order.model');

    if (!mongoose.Types.ObjectId.isValid(params.orderId)) {
      return Promise.reject(error.invalidId);
    }
    return new Order(this.test).model.aggregate([{
        $match: {
          '_id': mongoose.Types.ObjectId(params.orderId),
        }
      },
      {
        $project: {
          order_line: {
            $filter: {
              input: "$order_lines",
              as: "order_line",
              cond: {
                $ne: ["$$order_line._id", 1],
              },
            },
          },
        }
      },
      {
        $unwind: '$order_line'
      },
      {
        $unwind: '$order_line.tickets'
      },
      {
        $lookup: {
          from: "agent",
          localField: "order_line.tickets.agent_id",
          foreignField: "_id",
          as: "agent"
        }
      },
      {
        $lookup: {
          from: "warehouse",
          localField: "order_line.tickets.receiver_id",
          foreignField: "_id",
          as: "receiver_warehouse"
        }
      },
      {
        $lookup: {
          from: "agent",
          localField: "order_line.tickets.receiver_id",
          foreignField: "_id",
          as: "receiver_agent"
        }
      },
      {
        $group: {
          _id: '$_id',
          tickets: {
            $push: {
              $cond: {
                if: {
                  $eq: ['$order_line.tickets.receiver_id', user._id]
                },
                then: {
                  is_processed: '$order_line.tickets.is_processed',
                  receiver_warehouse: "$receiver_warehouse",
                  receiver_agent: "$receiver_agent",
                  desc: "$order_line.tickets.desc",
                  timestamp: "$order_line.tickets.timestamp",
                  status: "$order_line.tickets.status",
                  agent: "$agent"
                },
                else: null
              }
      
            }
          },
        }
      },
      {
        $project: {
          _id: 1,
          tickets: {
            $filter: {
              input: "$tickets",
              as: "ticket",
              cond: {
                $ne: ["$$ticket", null],
              }
            },
          },
        }
      },

    ]);

  }
}


module.exports = Ticket;
