import { API_URL } from '../utils/constants';

const CountriesApi = {};

CountriesApi.getCountries = async () => {
  const response = await fetch(`${API_URL}/api/countries`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}

CountriesApi.getStates = async (country) => {
  const response = await fetch(`${API_URL}/api/countries/${country}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}

CountriesApi.getCities = async (country, state) => {
  const response = await fetch(`${API_URL}/api/countries/${country}/${state}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}

CountriesApi.getDetails = async (country, state, city) => {
  let url = `${API_URL}/api/countries/details?`;

  if (country) {
    url = `${url}country=${country}`;

    if (state) {
      url = `${url}&state=${state}`;
    }

    if (city) {
      url = `${url}&city=${city}`;
    }

    const response = await fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.json();
  }

  return {};
}

export default CountriesApi;