import db from './db.js';

const Restaurant = function(restaurant) {
  this.credId = restaurant.credId;
  this.name = restaurant.fullname;
  this.location = restaurant.location;
  this.description = restaurant.description;
  this.phone = restaurant.phone;
  this.timing = restaurant.timing;
  this.deliveryModeAllowed = restaurant.deliveryModeAllowed;
};

Restaurant.create = (restaurant) => {
  return new Promise(resolve => {
    db.query('insert into restaurantProfile SET ?', restaurant, (err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, { id: result.insertId, ...restaurant }]);
    });
  });
}

Restaurant.update = (restaurant) => {
  return new Promise(resolve => {
    db.query(
      'update restaurantProfile SET ? where credId=?',
      [restaurant, restaurant.credId],
      (err) => {
        if (err) {
          resolve([err, null]);
          return;
        }
    
        resolve([null, restaurant]);
      }
    );
  });
}

Restaurant.find = (restaurant) => {
  return new Promise(resolve => {
    db.query(
      'select * from restaurantProfile where credId=?',
      restaurant.credId,
      (err, result) => {
        if (err) {
          resolve([err, null]);
          return;
        }
    
        resolve([null, result[0]]);
      }
    );
  });
}

export default Restaurant;