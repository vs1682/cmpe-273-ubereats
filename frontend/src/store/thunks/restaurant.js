import { createAsyncThunk } from '@reduxjs/toolkit';

import RestaurantApi from '../../api/restaurant';

const fetchRestaurant = createAsyncThunk(
  'restaurant/fetch',
  async (data) => {
    const response = await RestaurantApi.getProfile(data);
    return response;
  }
);

const fetchAllRestaurant = createAsyncThunk(
  'restaurant/all/fetch',
  async () => {
    const response = await RestaurantApi.getAll();
    return response;
  }
);

const updateRestaurant = createAsyncThunk(
  'restaurant/update',
  async (data) => {
    const response = await RestaurantApi.updateProfile(data);
    return response;
  }
);

export {
  fetchRestaurant,
  fetchAllRestaurant,
  updateRestaurant
};