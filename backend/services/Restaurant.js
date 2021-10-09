import Restaurant from '../models/Restaurant.js';
import Customer from '../models/Customer.js';

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

RestaurantService.findAll = async (query) => {
  const [err, restaurants] = await Restaurant.findAll();

  let favErr, customerFavorites;
  if (!err && query.customerId) {
    [favErr, customerFavorites] = await Customer.findAllFavoritesById(query.customerId);

    const customerFavoriteRestaurantIds = customerFavorites.map(f => f.restId);

    if (!favErr && restaurants) {
      restaurants.forEach(r => {
        r.isFavorite = false;

        if (customerFavoriteRestaurantIds.includes(r.credId)) {
          r.isFavorite = true;
        }
      });

      return [favErr, restaurants];
    }
  }
  
  return [err, restaurants];
}

RestaurantService.update = (query) => {
  const restaurant = new Restaurant(query);

  return Restaurant.update(restaurant);
}

export default RestaurantService;