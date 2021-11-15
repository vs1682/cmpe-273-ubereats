import { API_URL } from '../utils/constants';
import { changeIdKey } from '../utils/helper';
import API from './API';

const CredApi = {};
const api = new API(API_URL);

CredApi.signUp = async (data) => {
  const response = await api.post(`/api/creds/sign-up`, {}, JSON.stringify(data));

  return changeIdKey(await response.json());
}

CredApi.signIn = async (data) => {
  const response = await api.post(`/api/creds/sign-in`, {}, JSON.stringify(data));

  return changeIdKey(await response.json());
}

export default CredApi;