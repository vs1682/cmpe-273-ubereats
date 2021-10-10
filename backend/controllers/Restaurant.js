import RestaurantService from '../services/Restaurant.js';

const RestaurantController = {};

RestaurantController.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  const [err, data] = await RestaurantService.create(req.body);

  if (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Restaurant."
    });
  }

  res.json(data);
}

RestaurantController.findById = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  const { id } = req.params;

  const [err, data] = await RestaurantService.find({ credId: id });

  if (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while finding the Restaurant."
    });
  }

  res.json(data);
}

RestaurantController.findAll = async (req, res) => {
  console.log('----REST QUERY----', req.query);
  const [err, data] = await RestaurantService.findAll(req.query);

  if (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while finding the Restaurant."
    });
  }

  res.json(data);
}

RestaurantController.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  const { id } = req.params;

  const [err, data] = await RestaurantService.update({ credId: id, ...req.body });

  if (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while updating the Restaurant."
    });
  }

  res.json(data);
}

export default RestaurantController;