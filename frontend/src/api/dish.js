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

DishApi.getAll = async (restId) => {
  const response = await fetch(`${API_URL}/api/dish/${restId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}

DishApi.getDish = async (restId, id) => {
  const response = await fetch(`${API_URL}/api/dish/${restId}/${id}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}

DishApi.create = async (data) => {
  const response = await fetch(`${API_URL}/api/dish/create`, {
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data; boundary="form-boundary"'
    },
    body: data
  });

  return response.json();
}

export default DishApi;