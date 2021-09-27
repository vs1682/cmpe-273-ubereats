import { API_URL } from '../utils/constants';

const DishApi = {};

DishApi.getCategories = async () => {
  const response = await fetch(`${API_URL}/api/dish/categories`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}

DishApi.getTypes = async () => {
  const response = await fetch(`${API_URL}/api/dish/types`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}

export default DishApi;