import { createSlice } from '@reduxjs/toolkit';

import { fetchRestaurant } from '../thunks/restaurant';
import { LOCAL_STORE_KEYS } from '../../utils/constants';

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: JSON.parse(localStorage.getItem(LOCAL_STORE_KEYS.user)) || {},
  reducers: {
    removeRestaurant: () => {}
  },
  extraReducers: {
    [fetchRestaurant.fulfilled]: (state, action) => {
      if (action.payload) {
        return {
          ...state,
          ...action.payload
        };
      }

      return state;
    },
  },
})

// Action creators are generated for each case reducer function
export const { removeRestaurant } = restaurantSlice.actions

export default restaurantSlice.reducer