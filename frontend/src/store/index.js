import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import userReducer from './slices/user';
import restaurantReducer from './slices/restaurant';
import dishReducer from './slices/dish';
import customerReducer from './slices/customer';
import countriesReducer from './slices/countries';
import orderReducer from './slices/order';
import filterReducer from './slices/filters';

export default configureStore({
  reducer: {
    user: userReducer,
    restaurant: restaurantReducer,
    dish: dishReducer,
    customer: customerReducer,
    countries: countriesReducer,
    order: orderReducer,
    filters: filterReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});