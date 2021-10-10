import { API_URL } from '../utils/constants';

const OrderApi = {};

OrderApi.create = async (data) => {
  const response = await fetch(`${API_URL}/api/order/create`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
}

OrderApi.fetchById = async (id) => {
  const response = await fetch(`${API_URL}/api/order/${id}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}

OrderApi.fetchAllByCustomer = async (id) => {
  const response = await fetch(`${API_URL}/api/order/customer/${id}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}

OrderApi.fetchAllByRestaurant = async (id) => {
  const response = await fetch(`${API_URL}/api/order/restaurant/${id}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}

export default OrderApi;