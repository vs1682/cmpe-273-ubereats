import { API_URL } from '../utils/constants';
import { changeIdKey } from '../utils/helper';

const UploadApi = {};

UploadApi.getUploadUrl = async () => {
  const response = await fetch(`${API_URL}/api/upload`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return changeIdKey(await response.json());
}

UploadApi.uploadImage = async (url, file) => {
  const response = await fetch(url, {
    method: 'put',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    body: file
  });

  return changeIdKey(response);
}

export default UploadApi;

