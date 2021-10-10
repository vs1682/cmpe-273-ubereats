import _ from 'lodash';

import Restaurant from '../models/Restaurant.js';
import Customer from '../models/Customer.js';
import Dish from '../models/Dish.js';

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
  const filters = query.filters && JSON.parse(query.filters);
  let finalFilters = {};

  if (filters.searchText) {
    finalFilters = { searchText: filters.searchText }
  } else if (filters.types || filters.deliveryMode) {
    finalFilters = { types: filters.types, deliveryMode: filters.deliveryMode }
  }

  const [err, restaurants] = await Restaurant.findAll(finalFilters);
  let errDishes, dishes = [];
  if (finalFilters.types || finalFilters.searchText) {
    [errDishes, dishes] = await Dish.findAll(null, finalFilters);
  }
  
  let allSearchedRestaurants = restaurants;

  if (!errDishes) {
    const dishMatchedRestaurantIds = dishes.map(d => d.restId);
    if (dishMatchedRestaurantIds.length) {
      const [errDishMatchedRest, dishMatchedRestaurants] = await Restaurant.findMultiple(dishMatchedRestaurantIds);

      if (!errDishMatchedRest) {
        allSearchedRestaurants = _.uniqBy([...restaurants, ...dishMatchedRestaurants], 'credId');

        console.log('----allSearchedRestaurants---', allSearchedRestaurants);
      }
    }
  }

  let favErr, customerFavorites;
  if (!err && query.customerId) {
    [favErr, customerFavorites] = await Customer.findAllFavoritesById(query.customerId);

    const customerFavoriteRestaurantIds = customerFavorites.map(f => f.restId);

    if (!favErr && allSearchedRestaurants) {
      allSearchedRestaurants.forEach(r => {
        r.isFavorite = false;

        if (customerFavoriteRestaurantIds.includes(r.credId)) {
          r.isFavorite = true;
        }
      });

      return [favErr, allSearchedRestaurants];
    }
  }
  
  return [err, allSearchedRestaurants];
}

RestaurantService.update = (query) => {
  const restaurant = new Restaurant(query);

  return Restaurant.update(restaurant);
}

export default RestaurantService;