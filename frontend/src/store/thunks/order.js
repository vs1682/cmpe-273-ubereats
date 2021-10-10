import { createAsyncThunk } from '@reduxjs/toolkit';

import OrderApi from '../../api/order';

const createOrder = createAsyncThunk(
  'order/create',
  async (data) => {
    const response = await OrderApi.create(data);
    return response;
  }
);

const fetchOrder = createAsyncThunk(
  'order/fetch',
  async (id) => {
    const response = await OrderApi.fetchById(id);
    return response;
  }
);

const fetchOrderByCustomer = createAsyncThunk(
  'order/customer/fetch',
  async (id) => {
    const response = await OrderApi.fetchAllByCustomer(id);
    return response;
  }
);

const fetchOrderByRestaurant = createAsyncThunk(
  'order/restaurant/fetch',
  async (id) => {
    const response = await OrderApi.fetchAllByRestaurant(id);
    return response;
  }
);

export {
  createOrder,
  fetchOrder,
  fetchOrderByCustomer,
  fetchOrderByRestaurant
};