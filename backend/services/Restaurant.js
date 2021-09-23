import Restaurant from '../models/Restaurant.js';

const RestaurantService = {};

RestaurantService.create = (query) => {
  const { credId, fullname, location } = query;

  const restaurant = new Restaurant({
    credId,
    fullname,
    location
  });

  return Restaurant.create(restaurant);
}

RestaurantService.find = (query) => {
  const { credId } = query;

  const restaurant = new Restaurant({
    credId
  });

  return Restaurant.find(restaurant);
}

export default RestaurantService;