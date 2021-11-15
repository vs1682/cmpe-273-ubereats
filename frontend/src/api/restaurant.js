import { API_URL } from '../utils/constants';
import { changeIdKey } from '../utils/helper';
import { SecureAPI } from './API';

const RestaurantApi = {};
const api = new SecureAPI(API_URL);

RestaurantApi.getProfile = async (id) => {
  const response = await api.get(`/api/restaurant/profile/${id}`);

  return changeIdKey(await response.json());
}

RestaurantApi.updateProfile = async (data) => {
  const response = await api.put(
    `/api/restaurant/profile/${data.credId}`,
    {},
    JSON.stringify(data)
  );

  return changeIdKey(await response.json());
}

RestaurantApi.getAll = async (customerId, filters) => {
  let url = `/api/restaurant?customerId=${customerId}`;

  if (filters) {
    url += `&filters=${JSON.stringify(filters)}`;
  }

  const response = await api.get(url);

  return changeIdKey(await response.json());
}

export default RestaurantApi;