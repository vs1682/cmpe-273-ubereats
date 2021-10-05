import db from './db.js';

const Image = function(image) {
  this.id = image.id
  this.url = image.url
};

Image.create = (image) => {
  return new Promise(resolve => {
    db.query('insert into image SET ?', image, (err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, { ...image, id: result.insertId }]);
    });
  });
}

Image.find = (image) => {
  return new Promise(resolve => {
    db.query(
      'select * from image where id=?',
      [image.id],
      (err) => {
        if (err) {
          resolve([err, null]);
          return;
        }
    
        resolve([null, image]);
      }
    );
  });
}

export default Image;