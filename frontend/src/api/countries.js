import { API_URL } from '../utils/constants';
import { changeIdKey } from '../utils/helper';
import { SecureAPI } from './API';

const CountriesApi = {};

const api = new SecureAPI(API_URL);

CountriesApi.getCountries = async () => {
  const response = await api.get('/api/countries');

  return changeIdKey(await response.json());
}

CountriesApi.getStates = async (country) => {
  const response = await api.get(`/api/countries/${country}`);

  return changeIdKey(await response.json());
}

CountriesApi.getCities = async (country, state) => {
  const response = await api.get(`/api/countries/${country}/${state}`);

  return changeIdKey(await response.json());
}

CountriesApi.getDetails = async (country, state, city) => {
  let url = `/api/countries/details?`;

  if (country) {
    url = `${url}country=${country}`;

    if (state) {
      url = `${url}&state=${state}`;
    }

    if (city) {
      url = `${url}&city=${city}`;
    }

    const response = await api.get(url);

    return changeIdKey(await response.json());
  }

  return {};
}

export default CountriesApi;