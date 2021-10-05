import Image from '../models/Image.js';

const ImageService = {};

ImageService.create = (data) => {
  const {
    url
  } = data;

  const image = new Image({ url });

  return Image.create(image);
}

ImageService.find = (query) => {
  const { id } = query;

  return Image.find({ id });
}

export default ImageService;