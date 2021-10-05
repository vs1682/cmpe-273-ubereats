import db from './db.js';

const Dish = function(dish) {
  this.id = dish.id
  this.restId = dish.restId
  this.name = dish.name
  this.ingredients = dish.ingredients
  this.imageId = dish.imageId
  this.price = dish.price
  this.description = dish.description
  this.category = dish.category
  this.type = dish.type
};

Dish.create = (dish) => {
  return new Promise(resolve => {
    db.query('insert into dish SET ?', dish, (err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, { ...dish, id: result.insertId }]);
    });
  });
}

Dish.update = (dish) => {
  return new Promise(resolve => {
    db.query(
      'update dish SET ? where id=? and restId=?',
      [dish, dish.id, dish.restId],
      (err) => {
        if (err) {
          resolve([err, null]);
          return;
        }
    
        resolve([null, dish]);
      }
    );
  });
}

Dish.find = (restId, id) => {
  return new Promise(resolve => {
    db.query(
      'select d.*, i.url as imageUrl from dish d left join image i on d.imageId = i.id where d.id=? and d.restId=?',
      [id, restId],
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

Dish.findAll = (restId) => {
  return new Promise(resolve => {
    db.query(
      'select d.*, i.url as imageUrl from dish d left join image i on d.imageId = i.id where restId=?',
      restId,
      (err, result) => {
        if (err) {
          resolve([err, null]);
          return;
        }
    
        resolve([null, result]);
      }
    );
  });
}

Dish.getCategories = () => {
  return new Promise(resolve => {
    db.query(
      'select * from dishCategory',
      (err, result) => {
        if (err) {
          resolve([err, null]);
          return;
        }
    
        resolve([null, result]);
      }
    );
  });
}

Dish.getTypes = () => {
  return new Promise(resolve => {
    db.query(
      'select * from dishType',
      (err, result) => {
        if (err) {
          resolve([err, null]);
          return;
        }
    
        resolve([null, result]);
      }
    );
  });
}

export default Dish;