const Base = require('./base.model');
const _const = require('./const.list');
const mongoose = require('mongoose');
const errors = require('./errors.list');
const Ticket = require('./ticket.model');
const Warehouse = require('./warehouse.model');

class Delivery extends Base {

  constructor(test = Delivery.test) {
    super('Delivery', test);
    this.DeliveryModel = this.model;
  }

  getDeliveryItems(user, body) {
    let condition = {};

    if (user.access_level === _const.ACCESS_LEVEL.SalesManager) {
      condition = {$and: [{'from.warehouse_id': {$exists: false}}, {'from.customer': {$exists: true}}, {'is_return': true}]};
    } else if (mongoose.Types.ObjectId.isValid(user.warehouse_id)) {
      condition = {$and: [{'from.warehouse_id': mongoose.Types.ObjectId(user.warehouse_id)}, {'from.customer_id': {$exists: false}}]};
    } else {
      return Promise.reject(errors.noAccess);
    }

    return this.DeliveryModel.aggregate([
      {
        $match: condition
      },
      {
        $unwind: {
          path: '$order_details',
          preserveNullAndEmptyArrays: true
        }
      },
      // {
      //   $unwind: {
      //     path: '$order_details.order_line_ids',
      //     preserveNullAndEmptyArrays: true
      //   }
      // },
      {
        $lookup: {
          from: 'order',
          localField: 'order_details.order_id',
          foreignField: '_id',
          as: 'order'
        }
      },
      {
        $unwind: {
          path: '$order',
          preserveNullAndEmptyArrays: true
        }
      },
      // {
      //   $unwind: {
      //     path: '$order.order_lines',
      //     preserveNullAndEmptyArrays: true
      //   }
      // },
      // {
      //   $addFields: {'id_cmp': {$cmp: ['$order.order_lines._id', '$order_details.order_line_ids']}}
      // },
      // {
      //   $match: {
      //     id_cmp: 0,
      //   }
      // },
      {
        $lookup: {
          from: 'customer',
          localField: 'from.customer._id',
          foreignField: '_id',
          as: 'from_customer'
        }
      },
      {
        $unwind: {
          path: '$from_customer',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$from_customer.addresses',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {'from_adr_id_cmp': {$cmp: ['$from.customer.address_id', '$from_customer.addresses._id']}}
      },
      {
        $match: {
          from_adr_id_cmp: 0,
        }
      },
      {
        $lookup: {
          from: 'warehouse',
          localField: 'from.warehouse_id',
          foreignField: '_id',
          as: 'from_warehouse'
        }
      },
      {
        $unwind: {
          path: '$from_warehouse',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: '$_id',
          processed_by: {$first: '$processed_by'},
          from: {
            $first: {
              customer: {
                first_name: '$from_customer.first_name',
                surname: '$from_customer.surname',
                username: '$from_customer.username',
                address: '$from_customer.addresses',
                _id: '$from_customer._id'
              },
              warehouse_id: '$from.warehouse_id'
            }
          },
          to: {$first: '$to'},
          shelf_code: {$first: '$order.shelf_code'},
          is_return: {$first: '$is_return'},
          created_at: {$first: '$created_at'},
          start_date: {$first: '$start_date'},
          end_date: {$first: '$end_date'},
          slot: {$first: '$order.delivery_slot'},
          order_details: {
            $push: {
              order_id: '$order.order_id',
              order_line_ids: '$order_details.order_line_ids',
              slot: '$order.slot'
            }
          },
          delivery_agent: {$first: '$delivery_agent'},
        }
      },
      {
        $lookup: {
          from: 'customer',
          localField: 'to.customer._id',
          foreignField: '_id',
          as: 'to_customer'
        }
      },
      {
        $unwind: {
          path: '$to_customer',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$to_customer.addresses',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {'to_adr_id_cmp': {$cmp: ['$to.customer.address_id', '$to_customer.addresses._id']}}
      },
      {
        $match: {
          to_adr_id_cmp: 0,
        }
      },
      {
        $lookup: {
          from: 'warehouse',
          localField: 'to.warehouse_id',
          foreignField: '_id',
          as: 'to_warehouse'
        }
      },
      {
        $unwind: {
          path: '$to_warehouse',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'agent',
          localField: 'delivery_agent',
          foreignField: '_id',
          as: 'sender_agent',
        }
      },
      {
        $unwind: {
          path: '$sender_agent',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: '$_id',
          delivery_agent: {
            $first: {
              first_name: '$sender_agent.first_name',
              surname: '$sender_agent.surname',
              username: '$sender_agent.username',
              _id: '$sender_agent._id',
            }
          },
          from: {$first: '$from'},
          to: {
            $first: {
              customer: {
                first_name: '$to_customer.first_name',
                surname: '$to_customer.surname',
                username: '$to_customer.username',
                address: '$to_customer_address',
                _id: '$to_customer._id'
              },
              warehouse: '$to_warehouse'
            }
          },
          shelf_code: {$first: '$order.shelf_code'},
          is_return: {$first: '$is_return'},
          created_at: {$first: '$created_at'},
          start: {$first: '$start'},
          end: {$first: '$end'},
          delivery_start: {$first: '$delivery_start'},
          delivery_end: {$first: '$delivery_end'},
          slot: {$first: '$slot'},
          order_details: {$first: '$order_details'},
        }
      }
    ]);
  }

  updateDelivery(user, body) {
    if (!body._id)
      return Promise.reject(errors.deliveryIdIsRequired);

    const updateObj = {};

    if (body.delivery_agent_id)
      updateObj['delivery_agent'] = body.delivery_agent_id;

    if (body.start)
      updateObj['start'] = body.start;

    if (!Object.keys(updateObj).length)
      return Promise.resolve('nothing to save');

    updateObj['completed_by'] = user.id;

    return this.DeliveryModel.findOneAndUpdate({
      _id: body._id,
    }, {
      $set: updateObj,
    }, {
      new: true,
    })
      .then(res => {
        if (!mongoose.Types.ObjectId.isValid(res.delivery_agent))
          return Promise.resolve();

        let ticket = new Ticket(Delivery.test);
        let promiseList = [];

        res.order_details.forEach(order => {
          order.order_line_ids.forEach(order_line => {
            promiseList.push(ticket.setTicket(order.order_id, order_line, _const.ORDER_STATUS.OnDelivery, user.id, mongoose.Types.ObjectId(res.delivery_agent)));
          });
        });

        return Promise.all(promiseList);
      });
  }

  makeDeliveryShelfCode(delivery_Id) {
    let hub_id;
    let delivery;
    return new Warehouse(true).getHub().then(res => {
      hub_id = res[0]._id;
      return this.DeliveryModel.aggregate([
        {
          $match: {
            $and: [
              {'from.warehouse_id': {$exists: true}},
              {'from.warehouse_id': mongoose.Types.ObjectId(hub_id)},
              {'delivery_end': {$exists: false}}
            ]
          }
        },
      ]);
    }).then((res) => {
      delivery = res.find(d => d._id.toString() === delivery_Id.toString());
      res = res.filter(d => d.shelf_code).map(d => d.shelf_code).sort();
      if (delivery && delivery.shelf_code)
        return {
          shelf_code: delivery.shelf_code,
          exist: true,
        };
      else if (!delivery)
        return {
          shelf_code: "--",
          exist: false,
        };
      if (!res.find(d => d === "AA"))
        return {
          shelf_code: "AA",
          exist: false,
        };
      let returnValue = "";
      for (let i = 0; i < res.length; i++) {
        let d = res[i];
        let firstChar = String.fromCharCode(d.charCodeAt(1) + 1);
        let secondChar = String.fromCharCode(d.charCodeAt(0));
        if (firstChar > "Z") {
          firstChar = "A";
          secondChar = String.fromCharCode(d.charCodeAt(0) + 1)
        }
        if (!res.find(d => d === (secondChar + firstChar))) {
          returnValue = secondChar + firstChar;
          break;
        }
      }
      return {
        shelf_code: returnValue,
        exist: false,
      };
    }).catch(e => console.log(e));
  }

  getDeliveryData(delivery_id) {
    return this.DeliveryModel.aggregate([
      {
        $match: {
          '_id': mongoose.Types.ObjectId(delivery_id)
        }
      },
      {
        $lookup: {
          from: 'warehouse',
          localField: 'to.warehouse_id',
          foreignField: '_id',
          as: 'to_warehouse'
        }
      },
      {
        $lookup: {
          from: 'customer',
          localField: 'to.customer.id',
          foreignField: '_id',
          as: 'to_customer'
        }
      },
      {
        $lookup: {
          from: 'warehouse',
          localField: 'from.warehouse_id',
          foreignField: '_id',
          as: 'from_warehouse'
        }
      },
      {
        $lookup: {
          from: 'customer',
          localField: 'from.customer.id',
          foreignField: '_id',
          as: 'from_customer'
        }
      },
      {
        $project: {
          order_details: '$order_details',
          to: {
            customer: '$to_customer',
            customer_address_id: '$to.customer.address_id',
            warehouse: '$to_warehouse'
          },
          from: {
            customer: '$from_customer',
            customer_address_id: '$from.customer.address_id',
            warehouse: '$from_warehouse'
          },
          start: '$start',
          end: '$end',
          delivery_start: '$delivery_start',
          delivery_end: '$delivery_end',
          shelf_code: '$shelf_code',
        }
      }
    ]);
  }
}

Delivery.test = false;
module.exports = Delivery;