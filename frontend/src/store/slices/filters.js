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
      page: 1,
      limit: 5
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
        ...state.order,
        status: action.payload
      }
    },
    setOrderPagination: (state, action) => {
      state.order = {
        ...state.order,
        ...action.payload
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  setRestaurantFilters,
  setDishFilters,
  setOrderFilter,
  setOrderPagination
} = filterSlice.actions;

export default filterSlice.reducer