import { createSlice } from '@reduxjs/toolkit';

import {
  fetchCustomerProfile,
  updateCustomerProfile,
  fetchCustomerAddress,
  fetchCustomerAllAddresses,
  addCustomerAddress
} from '../thunks/customer';
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

const fetchAllAddressReducer = (state, action) => {
  if (action.payload) {
    return {
      ...state,
      address: {
        ...state.address,
        all: action.payload
      }
    };
  }

  return state;
}

const fetchSingleAddressReducer = (state, action) => {
  if (action.payload) {
    return {
      ...state,
      address: {
        ...state.address,
        selected: action.payload
      }
    };
  }

  return state;
}

const addAddressReducer = (state, action) => {
  if (action.payload) {
    return {
      ...state,
      address: {
        ...state.address,
        all: [...state.address.all, action.payload],
        selected: action.payload
      }
    };
  }

  return state;
}

export const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    profile: {},
    address: {
      selected: null,
      all: []
    }
  },
  reducers: {
    removeCustomer: () => {
      localStorage.removeItem(LOCAL_STORE_KEYS.user);
      return {};
    },
    selectAddress: (state, action) => {
      state.address.selected = action.payload;
    }
  },
  extraReducers: {
    [fetchCustomerProfile.fulfilled]: storeCustomerDetails,
    [updateCustomerProfile.fulfilled]: storeCustomerDetails,
    [fetchCustomerAddress.fulfilled]: fetchSingleAddressReducer,
    [fetchCustomerAllAddresses.fulfilled]: fetchAllAddressReducer,
    [addCustomerAddress.fulfilled]: addAddressReducer
  },
})

// Action creators are generated for each case reducer function
export const { removeCustomer, selectAddress } = customerSlice.actions

export default customerSlice.reducer