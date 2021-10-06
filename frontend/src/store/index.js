import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import userReducer from './slices/user';
import restaurantReducer from './slices/restaurant';
import dishReducer from './slices/dish';
import customerReducer from './slices/customer';
import countriesReducer from './slices/countries';

export default configureStore({
  reducer: {
    user: userReducer,
    restaurant: restaurantReducer,
    dish: dishReducer,
    customer: customerReducer,
    countries: countriesReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});