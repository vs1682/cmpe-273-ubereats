import mongoose from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
// import _ from 'lodash';
// import db from './db.js';
const Schema = mongoose.Schema;

const schemaOptions = { toJSON: { virtuals: true } };
const OrderSchema = new Schema({
  custId: {type: Schema.Types.ObjectId, ref: 'Customer', required: true},
  restId: {type: Schema.Types.ObjectId, ref: 'Restaurant', required: true},
  amount: Number,
  note: String,
  deliveryMode: Boolean,
  orderedAt: Date,
  status: {type: Schema.Types.ObjectId, ref: 'OrderStatus'}
}, schemaOptions);

OrderSchema.virtual('orderId').get(function() {
  return this._id.toString();
});

OrderSchema.plugin(mongooseLeanVirtuals);

const OrderModel = mongoose.model('Order', OrderSchema);

const Order = function(order) {
  this.orderId = order.orderId;
  this.custId = order.custId;
  this.restId = order.restId;
  this.amount = order.amount;
  this.note = order.note;
  this.deliveryMode = order.deliveryMode;
  this.orderedAt = order.orderedAt;
  this.status = order.status;
};

const OrderItemSchema = new Schema({
  orderId: {type: Schema.Types.ObjectId, ref: 'Order', required: true},
  dishId: {type: Schema.Types.ObjectId, ref: 'Dish', required: true},
  quantity: {type: Number, required: true}
}, schemaOptions);

const OrderItemModel = mongoose.model('OrderItem', OrderItemSchema);

const OrderItem = function(order) {
  this.orderId = order.orderId;
  this.dishId = order.dishId;
  this.quantity = order.quantity
};

const OrderStatusSchema = new Schema({
  name: {type: String, required: true}
});

OrderStatusSchema.virtual('id').get(function() {
  return this._id.toString();
});

OrderStatusSchema.plugin(mongooseLeanVirtuals);

const OrderStatusModel = mongoose.model('OrderStatus', OrderStatusSchema);

Order.create = (order) => {
  return new Promise(resolve => {
    OrderModel.create(order, (err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, { ...order, orderId: result._id }]);
    });
  });
}

Order.updateOrderStatus = (order) => {
  return new Promise(resolve => {
    OrderModel.updateOne(
      { _id: order.orderId },
      { status: order.status }
    )
    .lean({ virtuals: true })
    .exec((err) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, { ...order }]);
    })
  });
}

Order.insertOrderItems = (orderItems) => {
  return new Promise(resolve => {
    OrderItemModel.create(orderItems, (err) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, orderItems]);
    });
  });
}

Order.findById = (orderId) => {
  return new Promise(resolve => {
    OrderModel.findById(orderId)
    .lean({ virtuals: true })
    .exec((err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, result]);
    });
  });
}

Order.findOrderItems = (orderId) => {
  return new Promise(resolve => {
    OrderItemModel.find({ orderId })
    .lean({ virtuals: true })
    .exec((err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, result]);
    });
  });
}

Order.findMultipleOrderItems = (orderIds) => {
  return new Promise(resolve => {
    OrderItemModel.find({
      orderId: orderIds
    })
    .lean({ virtuals: true })
    .exec((err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, result]);
    });
  });
}

Order.findAllByCustomer = ({ custId, filters }) => {
  // let sqlQuery = 'select * from orders where custId = ?';
  // let values = [custId];
  let match = { custId };

  if (filters) {
    if (filters.status) {
      match.status = filters.status;
      // sqlQuery += ' and status = ?';
      // values.push(`${filters.status}`);
    }
  }

  return new Promise(resolve => {
    OrderModel.find(match)
    .limit(filters.limit)
    .skip((filters.page - 1) * filters.limit)
    .lean({ virtuals: true })
    .exec((err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }

      console.log('----MATCH----', match, err, result);

      resolve([null, result]);
    });
  });
}

Order.findAllByRestaurant = ({ restId, filters }) => {
  // let sqlQuery = 'select * from orders where restId = ?';
  // let values = [restId];
  let match = { restId };

  if (filters) {
    if (filters.status) {
      match.status = filters.status;
      // sqlQuery += ' and status = ?';
      // values.push(`${filters.status}`);
    }
  }

  return new Promise(resolve => {
    OrderModel.find(match)
    .limit(filters.limit)
    .skip((filters.page - 1) * filters.limit)
    .lean({ virtuals: true })
    .exec((err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, result]);
    });
  });
}

Order.findAllStatuses = () => {
  return new Promise(resolve => {
    OrderStatusModel.find()
    .lean({ virtuals: true })
    .exec((err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, result]);
    });
  });
}

export {
  OrderItem
};

export default Order;