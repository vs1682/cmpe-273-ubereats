import mongoose from 'mongoose';
// import db from './db.js';
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: { type: String, required: true }
});

const ImageModel = mongoose.model('Image', ImageSchema);

const Image = function(image) {
  this._id = image._id
  this.url = image.url
};

Image.create = (image) => {
  return new Promise(resolve => {
    ImageModel.create(image, (err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }

      console.log('---IMAGE DATA---', result, image);
  
      resolve([null, { ...image, _id: result._id }]);
    });
  });
}

Image.find = (image) => {
  return new Promise(resolve => {
    ImageModel.find({ _id: image.id })
    .exec((err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, result[0]]);
    })
  });
}

export default Image;