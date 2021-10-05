import { useState, useEffect } from 'react';

import UploadApi from '../api/upload';

const useUploadImage = (prevUrl) => {
  const [imageUrl, setImageUrl] = useState(prevUrl);

  const onUploadImage = async (file) => {
    const url = await UploadApi.getUploadUrl();
    await UploadApi.uploadImage(url.signedUrl, file);
    setImageUrl(url.signedUrl.split('?')[0]);
  }

  return [imageUrl, onUploadImage];
}

export default useUploadImage