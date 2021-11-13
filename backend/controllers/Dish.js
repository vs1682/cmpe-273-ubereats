import DishService from '../services/Dish.js';
import ImageService from '../services/Image.js';

const DishController = {};

DishController.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Required fields not present"
    });
    return;
  }

  let imgErr, imgData;
  if (req.body.imageUrl) {
    [imgErr, imgData] = await ImageService.create({ url: req.body.imageUrl });
  }

  const [err, data] = await DishService.create({ ...req.body, imageId: imgData ? imgData._id : null });

  if (imgErr || err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Dish."
    });
    return;
  }

  res.json(data);
}

DishController.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  let imgErr, imgData;
  if (!req.body.imageId && req.body.imageUrl) {
    [imgErr, imgData] = await ImageService.create({ url: req.body.imageUrl });
  }
  const [err, data] = await DishService.update({
    ...req.body,
    imageId: req.body.imageId ? req.body.imageId : (imgData && imgData.id) || null   });
  
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

DishController.delete = async (req, res) => {
  if (!req.query) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  const [err, data] = await DishService.deleteMultiple(req.query);
  
  if (err) {
    res.status(500).send({
      message:
      err.message || "Some error occurred while fetching dish."
    });
  }

  res.json(data);
}

DishController.deleteMultiple = async (req, res) => {
  if (!req.query) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  const [err, data] = await DishService.deleteMultiple({
    ...req.query,
    ids: JSON.parse(req.query.ids)
  });
  
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