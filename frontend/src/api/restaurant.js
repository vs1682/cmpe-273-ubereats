import { API_URL } from '../utils/constants';

const RestaurantApi = {};

RestaurantApi.getProfile = async (id) => {
  const response = await fetch(`${API_URL}/api/restaurant/profile/${id}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}

RestaurantApi.updateProfile = async (data) => {
  const response = await fetch(`${API_URL}/api/restaurant/profile/${data.credId}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
}

RestaurantApi.getAll = async () => {
  const response = await fetch(`${API_URL}/api/restaurant/`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}

export default RestaurantApi;