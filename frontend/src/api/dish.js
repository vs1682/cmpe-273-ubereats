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
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
}

DishApi.update = async (data) => {
  const response = await fetch(`${API_URL}/api/dish/${data.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
}

DishApi.deleteMultiple = async (restId, ids) => {
  await fetch(`${API_URL}/api/dish?restId=${restId}&ids=${JSON.stringify(ids)}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return ids;
}

export default DishApi;