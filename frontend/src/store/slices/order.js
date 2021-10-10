import { createSlice } from '@reduxjs/toolkit';

import {
  fetchOrder,
  fetchOrderByCustomer,
  fetchOrderByRestaurant,
  fetchOrderStatuses,
  updateOrderStatus
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

const fetchAllOrderStatusesReducer = (state, action) => {
  if (action.payload) {
    state.statuses = action.payload;
    return;
  }

  return state;
}

const updateOrderStatusReducer = (state, action) => {
  if (action.payload) {
    const { orderId, status } = action.payload;
    const allOrders = state.all.map(o => {
      if (o.orderId === orderId) {
        return {
          ...o,
          status
        };
      }

      return o;
    });

    return {
      ...state,
      all: allOrders
    }
  }

  return state;
}

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    selected: null,
    all: [],
    statuses: []
  },
  reducers: {
    selectOrder: (state, action) => {
      state.selected = action.payload;
    }
  },
  extraReducers: {
    [fetchOrder.fulfilled]: fetchOrderReducer,
    [fetchOrderByCustomer.fulfilled]: fetchAllOrderReducer,
    [fetchOrderByRestaurant.fulfilled]: fetchAllOrderReducer,
    [fetchOrderStatuses.fulfilled]: fetchAllOrderStatusesReducer,
    [updateOrderStatus.fulfilled]: updateOrderStatusReducer
  },
})

// Action creators are generated for each case reducer function
export const { selectOrder } = orderSlice.actions

export default orderSlice.reducer