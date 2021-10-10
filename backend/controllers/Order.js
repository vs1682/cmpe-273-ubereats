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

OrderController.findAllByCustomer = async (req, res) => {
  if (!req.params) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  const [err, data] = await OrderService.findAllByCustomer({ custId: req.params.id });

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

  const [err, data] = await OrderService.findAllByRestaurant({ restId: req.params.id });

  if (err) {
    res.status(500).send({
      message:
      err.message || "Some error occurred while fetching orders."
    });
  }

  res.json(data);
}

export default OrderController;