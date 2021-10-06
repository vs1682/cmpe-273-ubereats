import { createSlice } from '@reduxjs/toolkit';

import {
  fetchCountries,
  fetchStates,
  fetchCities,
  fetchDetails
} from '../thunks/countries';

export const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    countries: [],
    states: [],
    cities: []
  },
  reducers: {},
  extraReducers: {
    [fetchCountries.fulfilled]: (state, action) => ({
      ...state,
      countries: action.payload
    }),
    [fetchStates.fulfilled]: (state, action) => ({
      ...state,
      states: action.payload
    }),
    [fetchCities.fulfilled]: (state, action) => ({
      ...state,
      cities: action.payload
    }),
    [fetchDetails.fulfilled]: (state, action) => ({
      ...state,
      details: action.payload
    }),
  },
});

export default countriesSlice.reducer