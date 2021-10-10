import { createAsyncThunk } from '@reduxjs/toolkit';

import RestaurantApi from '../../api/restaurant';
import CustomerApi from '../../api/customer';

const fetchRestaurant = createAsyncThunk(
  'restaurant/fetch',
  async (data) => {
    const response = await RestaurantApi.getProfile(data);
    return response;
  }
);

const fetchAllRestaurant = createAsyncThunk(
  'restaurant/all/fetch',
  async ({ custId, filters }) => {
    const response = await RestaurantApi.getAll(custId, filters);
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

const addFavorite = createAsyncThunk(
  'restaurant/favorite/add',
  async (data) => {
    const response = await CustomerApi.addFavorite(data);
    return response;
  }
);

const fetchFavorites = createAsyncThunk(
  'restaurant/favorite/fetch',
  async (data) => {
    const response = await CustomerApi.fetchFavorites(data);
    return response;
  }
);

export {
  addFavorite,
  fetchRestaurant,
  fetchAllRestaurant,
  updateRestaurant,
  fetchFavorites
};