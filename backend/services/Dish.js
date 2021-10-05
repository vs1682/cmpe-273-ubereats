import Dish from '../models/Dish.js';

const DishService = {};

DishService.create = (data) => {
  const {
    restId,
    name,
    ingredients,
    imageId,
    price,
    description,
    category,
    type
  } = data;

  const dish = new Dish({
    restId,
    name,
    ingredients,
    imageId,
    price,
    description,
    category,
    type
  });

  return Dish.create(dish);
}

DishService.find = (query) => {
  const { id, restId } = query;

  return Dish.find(restId, id);
}

DishService.findAll = (query) => {
  const { restId } = query;

  return Dish.findAll(restId);
}

DishService.update = (data) => {
  const {
    id,
    restId,
    name,
    ingredients,
    imageId,
    price,
    description,
    category,
    type
  } = data;

  const dish = new Dish({
    id,
    restId,
    name,
    ingredients,
    imageId,
    price,
    description,
    category,
    type
  });

  return Dish.update(dish);
}

DishService.deleteMultiple = (query) => {
  const { restId, ids } = query;

  return Dish.deleteMultiple(restId, ids);
}

DishService.getCategories = () => {
  return Dish.getCategories();
}

DishService.getTypes = () => {
  return Dish.getTypes();
}

export default DishService;