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

const addCustomerAddress = createAsyncThunk(
  'customer/address/create',
  async (data) => {
    const response = await CustomerApi.addAddress(data);
    return response;
  }
);

const fetchCustomerAddress = createAsyncThunk(
  'customer/address',
  async (data) => {
    const response = await CustomerApi.getAddress(data);
    return response;
  }
);

const fetchCustomerAllAddresses = createAsyncThunk(
  'customer/address/all',
  async (data) => {
    const response = await CustomerApi.getAllAddresses(data);
    return response;
  }
);

export {
  fetchCustomerAddress,
  fetchCustomerAllAddresses,
  fetchCustomerProfile,
  updateCustomerProfile,
  addCustomerAddress
}