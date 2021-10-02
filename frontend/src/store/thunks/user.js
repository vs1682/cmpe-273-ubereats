import { createAsyncThunk } from '@reduxjs/toolkit';

import CredApi from '../../api/creds';
import { LOCAL_STORE_KEYS } from '../../utils/constants';

const fetchUser = createAsyncThunk(
  'user/fetch',
  async (data) => {
    const response = await CredApi.signIn(data);
    localStorage.setItem(LOCAL_STORE_KEYS.user, JSON.stringify(response));
    return response;
  }
);

const createUser = createAsyncThunk(
  'user/create',
  async (data) => {
    const response = await CredApi.signUp(data);
    localStorage.setItem(LOCAL_STORE_KEYS.user, JSON.stringify(response));
    return response;
  }
);

export {
  fetchUser,
  createUser
};