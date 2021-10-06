import Countries from '../data/countries.js';

const LocationService = {};

LocationService.getCountries = () => {
  return Countries.map(c => ({
    id: c.id,
    name: c.name,
    iso3: c.iso3
  }));
}

LocationService.getStates = countryCode => {
  const country = Countries.find(c => c.iso3 === countryCode);

  return country ? country.states : [];
}

LocationService.getCities = (countryCode, stateCode) => {
  const country = Countries.find(c => c.iso3 === countryCode) || {};
  const state = country.states ? country.states.find(s => s.state_code === stateCode) : {};

  return state.cities ? state.cities : [];
}

LocationService.getDetails = (countryCode, stateCode, cityCode) => {
  const result = {};

  if (countryCode) {
    const country = Countries.find(c => c.iso3 === countryCode) || {};
    result.country = {
      id: country.id,
      name: country.name,
      iso3: country.iso3
    };

    if (stateCode) {
      const state = country.states ? country.states.find(s => s.state_code === stateCode) : {};
      result.state = {
        id: state.id,
        name: state.name,
        stateCode: state.state_code
      };

      if (cityCode) {
        const city = state.cities ? state.cities.find(c => c.id === parseInt(cityCode)) : {};
        result.city = {
          id: city.id,
          name: city.name
        };
      }
    }
  }

  return result;
}

export default LocationService;