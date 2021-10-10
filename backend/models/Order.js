import db from './db.js';

const Order = function(order) {
  this.orderId = order.orderId;
  this.custId = order.custId;
  this.restId = order.restId;
  this.amount = order.amount;
  this.deliveryMode = order.deliveryMode;
  this.orderedAt = order.orderedAt;
};

const OrderItem = function(order) {
  this.orderId = order.orderId;
  this.dishId = order.dishId;
  this.quantity = order.quantity
};

Order.create = (order) => {
  return new Promise(resolve => {
    db.query("insert into orders SET ?", order, (err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, { ...order, orderId: result.insertId }]);
    });
  });
}

Order.insertOrderItems = (orderItems) => {
  return new Promise(resolve => {
    db.query("insert into orderItem (orderId, dishId, quantity) VALUES ?", [orderItems], (err) => {
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
    db.query("select * from orders where orderId = ?", [orderId], (err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, result[0]]);
    });
  });
}

Order.findOrderItems = (orderId) => {
  return new Promise(resolve => {
    db.query("select * from orderItem where orderId = ?", [orderId], (err, result) => {
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
    db.query("select * from orderItem where orderId in (?)", [orderIds], (err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, result]);
    });
  });
}

Order.findAllByCustomer = ({ custId }) => {
  return new Promise(resolve => {
    db.query("select * from orders where custId = ?", [custId], (err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, result]);
    });
  });
}

Order.findAllByRestaurant = ({ restId }) => {
  return new Promise(resolve => {
    db.query("select * from orders where restId = ?", [restId], (err, result) => {
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