import ImageService from '../services/Image.js';

const uploadImage = async (req, res, next) => {
  const { imageId, imageUrl } = req.body;

  let imgErr, imgData;
  if (!imageId && imageUrl) {
    [imgErr, imgData] = await ImageService.create({ url: imageUrl });
  }

  if (imgData && imgData.id) {
    req.body.imageId = imgData.id;
  }

  next();
}

export default uploadImage;