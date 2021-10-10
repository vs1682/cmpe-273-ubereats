import { createSlice } from '@reduxjs/toolkit';

import {
  fetchOrder,
  fetchOrderByCustomer,
  fetchOrderByRestaurant
} from '../thunks/order';

const fetchOrderReducer = (state, action) => {
  if (action.payload) {
    state.selected = action.payload;
    return;
  }

  return state;
}

const fetchAllOrderReducer = (state, action) => {
  if (action.payload) {
    state.all = action.payload;
    return;
  }

  return state;
}

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    selected: null,
    all: []
  },
  reducers: {
    selectOrder: (state, action) => {
      state.selected = action.payload;
    }
  },
  extraReducers: {
    [fetchOrder.fulfilled]: fetchOrderReducer,
    [fetchOrderByCustomer.fulfilled]: fetchAllOrderReducer,
    [fetchOrderByRestaurant.fulfilled]: fetchAllOrderReducer
  },
})

// Action creators are generated for each case reducer function
export const { selectOrder } = orderSlice.actions

export default orderSlice.reducer