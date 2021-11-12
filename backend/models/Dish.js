import mongoose from 'mongoose';
import _ from 'lodash';
// import db from './db.js';
const Schema = mongoose.Schema;

const DishSchema = new Schema({
  restId: {type: Schema.Types.ObjectId, ref: 'Restaurant', required: true},
  name: { type: String, required: true},
  ingredients: String,
  imageId: {type: Schema.Types.ObjectId, ref: 'Image'},
  price: Number,
  description: String,
  category: {type: Schema.Types.ObjectId, ref: 'DishCategory'},
  type: {type: Schema.Types.ObjectId, ref: 'DishType'},
});

const DishModel = mongoose.model('Dish', DishSchema);

const DishCategorySchema = new Schema({
  _id: {type: Schema.Types.ObjectId, required: true},
  name: {type: String, required: true}
});

const DishCategoryModel = mongoose.model('DishCategory', DishCategorySchema);

const DishTypeSchema = new Schema({
  _id: {type: Schema.Types.ObjectId, required: true},
  name: {type: String, required: true}
});

const DishTypeModel = mongoose.model('DishType', DishTypeSchema);

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
    DishModel.create(dish, (err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, { ...dish, _id: result._id }]);
    });
  });
}

Dish.update = (dish) => {
  return new Promise(resolve => {
    DishModel.updateOne(
      { _id: dish.id, restId: dish.restId },
      dish,
      {},
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
    DishModel.aggregate()
    .match({
      restId: mongoose.Types.ObjectId(restId),
      _id: mongoose.Types.ObjectId(id)
    })
    .lookup({
      from: 'image',
      localField: 'imageId',
      foreignField: '_id',
      as: 'image'
    })
    .unwind('image')
    .exec((err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, {..._.omit(result[0], 'image'), imageUrl: result[0].image.url}]);
    });
  });
}

Dish.findMultiple = (restId, dishIds) => {
  return new Promise(resolve => {
    DishModel.aggregate()
    .match({
      restId: mongoose.Types.ObjectId(restId),
      _id: dishIds.map(id => mongoose.Types.ObjectId(id))
    })
    .lookup({
      from: 'image',
      localField: 'imageId',
      foreignField: '_id',
      as: 'image'
    })
    .unwind('image')
    .exec((err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, result]);
    });
  });
}

Dish.findMultipleRestaurantDishes = (restIds, dishIds) => {
  return new Promise(resolve => {
    DishModel.aggregate()
    .match({
      restId: restIds.map(id => mongoose.Types.ObjectId(id)),
      _id: dishIds.map(id => mongoose.Types.ObjectId(id))
    })
    .lookup({
      from: 'image',
      localField: 'imageId',
      foreignField: '_id',
      as: 'image'
    })
    .unwind('image')
    .exec((err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, result]);
    });
  });
}

Dish.findAll = (restId, filters) => {
  // let sqlQuery = 'select d.*, i.url as imageUrl from dish d left join image i on d.imageId = i.id';
  // let values = [];
  // let addConnectors = false;

  let match = {};

  if (restId) {
    match.restId = mongoose.Types.ObjectId(restId);
    // sqlQuery += ' where restId = ?';
    // values.push(restId);
    // addConnectors = true;
  }

  if (filters) {
    if (filters.types) {
      match.type = filters.types;
      // const connectingText = addConnectors ? ' and' : ' where';
      // sqlQuery += connectingText + ' type in (?)';
      // values.push(filters.types);
      // addConnectors = true;
    }

    if (filters.searchText) {
      match.name = new RegExp(filters.searchText,'i');
      // const connectingText = addConnectors ? ' and' : ' where';
      // sqlQuery += `${connectingText} (name like '%${filters.searchText}%')`;
    }
  }

  console.log('---SQL----', match)

  return new Promise(resolve => {
    DishModel.aggregate()
    .match(match)
    .lookup({
      from: 'images',
      localField: 'imageId',
      foreignField: '_id',
      as: 'image'
    })
    .unwind({ path: '$image', preserveNullAndEmptyArrays: true })
    .exec((err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }

      result = result.map(r => {
        if (r.image) {
          r.imageUrl = r.image.url;
        }
        
        _.omit(r, 'image');

        return r;
      });
  
      resolve([null, result]);
    });
  });
}

Dish.delete = (restId, ids) => {
  return new Promise(resolve => {
    DishModel.deleteOne(
      {
        restId,
        _id: ids
      },
      {},
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

Dish.deleteMultiple = (restId, ids) => {
  return new Promise(resolve => {
    DishModel.deleteOne(
      {
        restId,
        _id: ids
      },
      {},
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
    DishCategoryModel.find()
    .exec((err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, result]);
    });
  });
}

Dish.getTypes = () => {
  return new Promise(resolve => {
    DishTypeModel.find()
    .exec((err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, result]);
    });
  });
}

export default Dish;