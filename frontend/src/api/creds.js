import { API_URL } from '../utils/constants';
import { changeIdKey } from '../utils/helper';

const CredApi = {};

CredApi.signUp = async (data) => {
  const response = await fetch(`${API_URL}/api/creds/sign-up`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return changeIdKey(await response.json());
}

CredApi.signIn = async (data) => {
  const response = await fetch(`${API_URL}/api/creds/sign-in`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return changeIdKey(await response.json());
}

export default CredApi;