import { createSlice } from '@reduxjs/toolkit';

import {
  createDish,
  fetchDish,
  updateDish,
  deleteDishes,
  fetchAllDishes,
  fetchDishCategories,
  fetchDishTypes
} from '../thunks/dish';

const createDishReducer = (state, action) => {
  if (action.payload) {
    return {
      ...state,
      all: [...state.all, action.payload],
      selected: action.payload,
    };
  }

  return state;
}

const fetchDishReducer = (state, action) => {
  if (action.payload) {
    return {
      ...state,
      selected: action.payload
    };
  }

  return state;
}

const fetchAllDishesReducer = (state, action) => {
  if (action.payload) {
    return {
      ...state,
      all: action.payload
    };
  }

  return state;
}

const updateDishReducer = (state, action) => {
  if (action.payload) {
    const all = state.all.map(d => {
      if (d.id == action.payload.id) {
        return {
          ...state.selected,
          ...action.payload
        };
      }

      return d;
    });

    return {
      ...state,
      all,
      selected: {
        ...state.selected,
        ...action.payload
      }
    };
  }

  return state;
}

const deleteDishReducer = (state, action) => {
  if (action.payload) {
    const all = state.all.filter(d => {
      if (!action.payload.includes(d.id)) {
        return d;
      }
    });

    return {
      ...state,
      all,
      selected: {}
    };
  }

  return state;
}

const categoriesReducer = (state, action) => {
  if (action.payload) {
    return {
      ...state,
      categories: action.payload
    };
  }

  return state;
}

const typesReducer = (state, action) => {
  if (action.payload) {
    return {
      ...state,
      types: action.payload
    };
  }

  return state;
}

export const dishSlice = createSlice({
  name: 'dish',
  initialState: {
    all: [],
    categories: [],
    types: []
  },
  reducers: {
    removeDish: (state) => {
      return {
        ...state,
        selected: null
      }
    }
  },
  extraReducers: {
    [createDish.fulfilled]: createDishReducer,
    [fetchDish.fulfilled]: fetchDishReducer,
    [updateDish.fulfilled]: updateDishReducer,
    [deleteDishes.fulfilled]: deleteDishReducer,
    [fetchAllDishes.fulfilled]: fetchAllDishesReducer,
    [fetchDishCategories.fulfilled]: categoriesReducer,
    [fetchDishTypes.fulfilled]: typesReducer
  },
})

// Action creators are generated for each case reducer function
export const { removeDish } = dishSlice.actions

export default dishSlice.reducer