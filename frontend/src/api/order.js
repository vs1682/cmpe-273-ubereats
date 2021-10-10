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

OrderApi.fetchAllByCustomer = async (id, filters) => {
  const response = await fetch(`${API_URL}/api/order/customer/${id}?filters=${JSON.stringify(filters)}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}

OrderApi.fetchAllByRestaurant = async (id, filters) => {
  const response = await fetch(`${API_URL}/api/order/restaurant/${id}?filters=${JSON.stringify(filters)}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}

OrderApi.fetchAllStatuses = async () => {
  const response = await fetch(`${API_URL}/api/order/statuses`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}

OrderApi.updateOrderStatus = async (orderId, status) => {
  const response = await fetch(`${API_URL}/api/order/${orderId}/status/${status}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}

export default OrderApi;