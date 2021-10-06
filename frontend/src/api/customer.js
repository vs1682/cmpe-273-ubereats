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

export default CustomerApi;