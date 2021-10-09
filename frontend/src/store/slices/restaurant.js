import { createSlice } from '@reduxjs/toolkit';

import { fetchRestaurant, fetchAllRestaurant, addFavorite } from '../thunks/restaurant';
import { LOCAL_STORE_KEYS } from '../../utils/constants';

const fetchRestaurantReducer = (state, action) => {
  if (action.payload) {
    return {
      ...state,
      ...action.payload,
      selected: action.payload
    };
  }

  return state;
}

const fetchAllRestaurantReducer = (state, action) => {
  if (action.payload) {
    return {
      ...state,
      all: action.payload
    };
  }

  return state;
}

const customerFavoriteReducer = (state, action) => {
  if (action.payload) {
    return {
      ...state,
      all: state.all.map(r => {
        if (r.credId === action.payload.restId) {
          return {
            ...r,
            isFavorite: true
          }
        }
  
        return r;
      })
    }
  }

  return state;
}

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: JSON.parse(localStorage.getItem(LOCAL_STORE_KEYS.user)) || {},
  reducers: {
    removeRestaurant: () => {}
  },
  extraReducers: {
    [fetchRestaurant.fulfilled]: fetchRestaurantReducer,
    [fetchAllRestaurant.fulfilled]: fetchAllRestaurantReducer,
    [addFavorite.fulfilled]: customerFavoriteReducer
  },
})

// Action creators are generated for each case reducer function
export const { removeRestaurant } = restaurantSlice.actions

export default restaurantSlice.reducer