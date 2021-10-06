import { createAsyncThunk } from '@reduxjs/toolkit';

import CountriesApi from '../../api/countries';

const fetchCountries = createAsyncThunk(
  'countries/fetch',
  async () => {
    const response = await CountriesApi.getCountries();
    return response;
  }
);

const fetchStates = createAsyncThunk(
  'countries/states/fetch',
  async ({ country }) => {
    const response = await CountriesApi.getStates(country);
    return response;
  }
);

const fetchCities = createAsyncThunk(
  'countries/state/cities/fetch',
  async ({ country, state }) => {
    const response = await CountriesApi.getCities(country, state);
    return response;
  }
);

const fetchDetails = createAsyncThunk(
  'countries/details/fetch',
  async ({ country, state, city }) => {
    const response = await CountriesApi.getDetails(country, state, city);
    return response;
  }
);

export {
  fetchCountries,
  fetchStates,
  fetchCities,
  fetchDetails
}