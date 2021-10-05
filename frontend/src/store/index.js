import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import userReducer from './slices/user';
import restaurantReducer from './slices/restaurant';

export default configureStore({
  reducer: {
    user: userReducer,
    restaurant: restaurantReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});