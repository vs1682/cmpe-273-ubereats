import { createSlice } from '@reduxjs/toolkit';

import { fetchCustomerProfile, updateCustomerProfile } from '../thunks/customer';
import { LOCAL_STORE_KEYS } from '../../utils/constants';

const storeCustomerDetails = (state, action) => {
  if (action.payload) {
    return {
      ...state,
      profile: {
        ...(state.profile || {}),
        ...action.payload
      }
    }
  }

  return state;
}

export const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    profile: {}
  },
  reducers: {
    removeCustomer: () => {
      localStorage.removeItem(LOCAL_STORE_KEYS.user);
      return {};
    }
  },
  extraReducers: {
    [fetchCustomerProfile.fulfilled]: storeCustomerDetails,
    [updateCustomerProfile.fulfilled]: storeCustomerDetails
  },
})

// Action creators are generated for each case reducer function
export const { removeCustomer } = customerSlice.actions

export default customerSlice.reducer