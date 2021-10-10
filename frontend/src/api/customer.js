import { API_URL } from '../utils/constants';

const CustomerApi = {};

CustomerApi.getProfile = async (id) => {
  const response = await fetch(`${API_URL}/api/customer/profile/${id}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}

CustomerApi.updateProfile = async (data) => {
  const response = await fetch(`${API_URL}/api/customer/profile/${data.credId}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
}

CustomerApi.addFavorite = async (data) => {
  const response = await fetch(`${API_URL}/api/customer/favorite`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
}

CustomerApi.addAddress = async (data) => {
  const response = await fetch(`${API_URL}/api/customer/address`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
}

CustomerApi.getAddress = async ({ custId, addressId }) => {
  const response = await fetch(`${API_URL}/api/customer/address?custId=${custId}&addressId=${addressId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}

CustomerApi.getAllAddresses = async ({ custId }) => {
  const response = await fetch(`${API_URL}/api/customer/address/all?custId=${custId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}

CustomerApi.fetchFavorites = async (custId) => {
  const response = await fetch(`${API_URL}/api/customer/${custId}/favorites`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}

export default CustomerApi;