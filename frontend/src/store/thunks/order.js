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
  async ({ id, filters }) => {
    const response = await OrderApi.fetchAllByCustomer(id, filters);
    return response;
  }
);

const fetchOrderByRestaurant = createAsyncThunk(
  'order/restaurant/fetch',
  async ({ id, filters }) => {
    const response = await OrderApi.fetchAllByRestaurant(id, filters);
    return response;
  }
);

const fetchOrderStatuses = createAsyncThunk(
  'order/statuses/fetch',
  async () => {
    const response = await OrderApi.fetchAllStatuses();
    return response;
  }
);

const updateOrderStatus = createAsyncThunk(
  'order/status/update',
  async ({ orderId, status }) => {
    const response = await OrderApi.updateOrderStatus(orderId, status);
    return response;
  }
);

export {
  createOrder,
  fetchOrder,
  fetchOrderByCustomer,
  fetchOrderByRestaurant,
  fetchOrderStatuses,
  updateOrderStatus
};