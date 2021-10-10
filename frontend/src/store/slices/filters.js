import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    restaurant: {
      deliveryMode: true,
      searchText: '',
    },
    dish: {
      searchText: '',
      types: []
    },
    order: {
      status: 1
    }
  },
  reducers: {
    setRestaurantFilters: (state, action) => {
      state.restaurant = {
        ...state.restaurant,
        ...action.payload
      }
    },
    setDishFilters: (state, action) => {
      state.dish = {
        ...state.dish,
        ...action.payload
      }
    } ,
    setOrderFilter: (state, action) => {
      state.order = {
        status: action.payload
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  setRestaurantFilters,
  setDishFilters,
  setOrderFilter
} = filterSlice.actions

export default filterSlice.reducer