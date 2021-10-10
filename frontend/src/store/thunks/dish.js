import { createAsyncThunk } from '@reduxjs/toolkit';

import DishApi from '../../api/dish';

const createDish = createAsyncThunk(
  'dish/create',
  async (data) => {
    const response = await DishApi.create(data);
    return {
      ...response,
      imageUrl: data.imageUrl
    };
  }
);

const fetchDish = createAsyncThunk(
  'dish/fetch',
  async ({ restId, dishId }) => {
    const response = await DishApi.getDish(restId, dishId);
    return response;
  }
);

const fetchAllDishes = createAsyncThunk(
  'dish/all/fetch',
  async (data) => {
    const response = await DishApi.getAll(data);
    return response;
  }
);

const updateDish = createAsyncThunk(
  'dish/update',
  async (data) => {
    const response = await DishApi.update(data);
    return {
      ...response,
      imageUrl: data.imageUrl
    };
  }
);

const deleteDishes = createAsyncThunk(
  'dish/delete',
  async ({restId, ids}) => {
    const response = await DishApi.deleteMultiple(restId, ids);
    return response;
  }
);

const fetchDishCategories = createAsyncThunk(
  'dish/categories',
  async () => {
    const response = await DishApi.getCategories();
    return response;
  }
);

const fetchDishTypes = createAsyncThunk(
  'dish/types',
  async () => {
    const response = await DishApi.getTypes();
    return response;
  }
);

export {
  createDish,
  deleteDishes,
  fetchDish,
  fetchAllDishes,
  updateDish,
  fetchDishCategories,
  fetchDishTypes
};