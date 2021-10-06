import { createAsyncThunk } from '@reduxjs/toolkit';

import CustomerApi from '../../api/customer';

const fetchCustomerProfile = createAsyncThunk(
  'customer/fetch',
  async (id) => {
    const response = await CustomerApi.getProfile(id);
    return response;
  }
);

const updateCustomerProfile = createAsyncThunk(
  'customer/update',
  async (data) => {
    const response = await CustomerApi.updateProfile(data);
    return response;
  }
);

export {
  fetchCustomerProfile,
  updateCustomerProfile
}