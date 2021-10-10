import _ from 'lodash';
import OrderService from '../services/Order.js';

const OrderController = {};

OrderController.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  const [err, data] = await OrderService.create(req.body);

  if (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Order."
    });
  }

  res.json(data);
}

OrderController.findById = async (req, res) => {
  if (!req.params) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  const [err, data] = await OrderService.findById({ orderId: req.params.id });

  if (err) {
    res.status(500).send({
      message:
      err.message || "Some error occurred while fetching order."
    });
  }

  res.json(data);
}

OrderController.updateOrderStatus = async (req, res) => {
  if (!req.params) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  const [err, data] = await OrderService.updateOrderStatus({
    orderId: parseInt(req.params.id),
    status: parseInt(req.params.status)
  });

  if (err) {
    res.status(500).send({
      message:
      err.message || "Some error occurred while updating order status."
    });
  }

  res.json(data);
}

OrderController.findAllByCustomer = async (req, res) => {
  if (!req.params) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  const custId = _.get(req, 'params.id');
  let filters = _.get(req, 'query.filters');
  filters = filters && JSON.parse(filters);

  const [err, data] = await OrderService.findAllByCustomer({
    custId,
    filters
  });

  if (err) {
    res.status(500).send({
      message:
      err.message || "Some error occurred while fetching orders."
    });
  }

  res.json(data);
}

OrderController.findAllByRestaurant = async (req, res) => {
  if (!req.params) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  const restId = _.get(req, 'params.id');
  let filters = _.get(req, 'query.filters');
  filters = filters && JSON.parse(filters);

  const [err, data] = await OrderService.findAllByRestaurant({ restId, filters });

  if (err) {
    res.status(500).send({
      message:
      err.message || "Some error occurred while fetching orders."
    });
  }

  res.json(data);
}

OrderController.getOrderStatuses = async (req, res) => {
  const [err, data] = await OrderService.findAllStatuses();
  
  if (err) {
    res.status(500).send({
      message:
      err.message || "Some error occurred while fetching order statuses."
    });
  }

  res.json(data);
}

export default OrderController;