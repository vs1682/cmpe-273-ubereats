import _ from 'lodash';

import Order from '../models/Order.js';
import Customer from '../models/Customer.js';
import Restaurant from '../models/Restaurant.js';
import Dish from '../models/Dish.js';

const OrderService = {};

OrderService.create = async (data) => {
  const {
    custId,
    restId,
    amount,
    deliveryMode,
    orderedAt,
    dishes,
    status
  } = data;

  let err, createdOrder;

  if (dishes) {
    const order = new Order({
      custId,
      restId,
      amount,
      deliveryMode,
      orderedAt,
      status
    });

    [err, createdOrder] = await Order.create(order);

    if (!err) {
      const { orderId } = createdOrder;
      const orderItems = dishes.map(({ dishId, quantity }) => {
        return [orderId, dishId, quantity];
      });

      return Order.insertOrderItems(orderItems);
    }
  }

  return [err || { message: 'No items in order' }, null];
}

OrderService.findById = async (query) => {
  const { orderId } = query;

  const [err, order] = await Order.findById(orderId);

  if (!err) {
    const [errItems, orderItems] = await Order.findOrderItems(orderId);

    if (!errItems) {
      const [[errRest, restaurant], [errDish, dishes]] = await Promise.all([
        Restaurant.find({ credId: order.restId }),
        Dish.findMultiple(order.restId, orderItems.map(i => i.dishId))
      ]);

      if (!errRest && !errDish) {
        const dishQuantityMap = _.keyBy(orderItems, 'dishId');

        order.restaurant = restaurant;
        order.dishes = dishes.map(d => {
          d.quantity = dishQuantityMap[d.id].quantity || 0;

          return d;
        });

        return [null, order];
      }
    }

    return [errItems, null];
  }

  return [err, null];
}

OrderService.findAllByRestaurant = async (query) => {
  const [err, orders] = await Order.findAllByRestaurant(query);

  if (!err) {
    const orderIds = orders.map(o => o.orderId);
    let errItems, orderItems;

    if (orderIds.length) {
      [errItems, orderItems] = await Order.findMultipleOrderItems(orders.map(o => o.orderId));
    }

    if (!errItems && orderItems) {
      const custIds = orders.map(o => o.custId);
      const dishIds = orderItems.map(i => i.dishId);
      const [[errRest, customers], [errDish, dishes]] = await Promise.all([
        Customer.findMultiple(custIds),
        Dish.findMultiple(query.restId, dishIds)
      ]);

      if (!errRest && !errDish) {
        const customerMap = _.keyBy(customers, 'credId');
        const dishMap = _.keyBy(dishes, 'id');
        const orderedDishes = _.groupBy(orderItems, 'orderId');

        const allOrders = orders.map(o => {
          const dishes = orderedDishes[o.orderId].map(({ dishId, quantity }) => ({
            ...dishMap[dishId],
            quantity 
          }));
          o.customer = customerMap[o.custId];
          o.dishes = dishes;

          return o;
        });

        return [null, allOrders];
      }
    }

    return [errItems, []];
  }

  return [err, []];
}

OrderService.findAllByCustomer = async (query) => {
  const [err, orders] = await Order.findAllByCustomer(query);

  if (!err) {
    const orderIds = orders.map(o => o.orderId);
    let errItems, orderItems;

    if (orderIds.length) {
      [errItems, orderItems] = await Order.findMultipleOrderItems(orderIds);
    }

    if (!errItems && orderItems) {
      const restIds = orders.map(o => o.restId);
      const dishIds = orderItems.map(i => i.dishId);
      const [[errRest, restaurants], [errDish, dishes]] = await Promise.all([
        Restaurant.findMultiple(restIds),
        Dish.findMultipleRestaurantDishes(restIds, dishIds)
      ]);

      if (!errRest && !errDish) {
        const restaurantMap = _.keyBy(restaurants, 'credId');
        const dishMap = _.keyBy(dishes, 'id');
        const orderedDishes = _.groupBy(orderItems, 'orderId');

        const allOrders = orders.map(o => {
          const dishes = orderedDishes[o.orderId].map(({ dishId, quantity }) => ({
            ...dishMap[dishId],
            quantity 
          }));
          o.restaurant = restaurantMap[o.restId];
          o.dishes = dishes;

          return o;
        });

        return [null, allOrders];
      }
    }

    return [errItems, []];
  }

  return [err, []];
}

OrderService.findAllStatuses = async () => {
  return Order.findAllStatuses();
}

OrderService.updateOrderStatus = async (query) => {
  return Order.updateOrderStatus(query);
}

export default OrderService;