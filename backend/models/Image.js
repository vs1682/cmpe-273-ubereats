import mongoose from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
// import db from './db.js';
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: { type: String, required: true }
});

ImageSchema.virtual('id').get(function() {
  return this._id.toString();
});

ImageSchema.plugin(mongooseLeanVirtuals);

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

      resolve([null, { ...image, id: result._id }]);
    });
  });
}

Image.find = (image) => {
  return new Promise(resolve => {
    ImageModel.findOne({ _id: image.id })
    .lean({ virtuals: true })
    .exec((err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, result]);
    })
  });
}

export default Image;