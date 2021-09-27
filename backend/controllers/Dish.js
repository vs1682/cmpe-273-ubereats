import DishService from '../services/Dish.js';
import Customer from '../services/Customer.js';
import Restaurant from '../services/Restaurant.js';
import { USER_TYPE } from '../utils/constants.js';

const DishController = {};

DishController.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  const [err, data] = await DishService.create(req.body);

  if (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Dish."
    });
  }

  res.json(data);
}

DishController.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  const [err, data] = await DishService.update(req.body);
  
  if (err) {
    res.status(500).send({
      message:
      err.message || "Some error occurred while updating dish."
    });
  }

  res.json(data);
}

DishController.find = async (req, res) => {
  if (!req.params) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  const [err, data] = await DishService.find(req.params);
  
  if (err) {
    res.status(500).send({
      message:
      err.message || "Some error occurred while fetching dish."
    });
  }

  res.json(data);
}

DishController.findAll = async (req, res) => {
  if (!req.params) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  const [err, data] = await DishService.findAll(req.params);
  
  if (err) {
    res.status(500).send({
      message:
      err.message || "Some error occurred while fetching dish."
    });
  }

  res.json(data);
}

DishController.getCategories = async (req, res) => {
  const [err, data] = await DishService.getCategories();
  
  if (err) {
    res.status(500).send({
      message:
      err.message || "Some error occurred while fetching dish categories."
    });
  }

  res.json(data);
}

DishController.getTypes = async (req, res) => {
  const [err, data] = await DishService.getTypes();
  
  if (err) {
    res.status(500).send({
      message:
      err.message || "Some error occurred while fetching dish types."
    });
  }

  res.json(data);
}

export default DishController;