import mongoose from 'mongoose';
// import db from './db.js';
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  credId: { type: Schema.Types.ObjectId, ref: 'Creds', required: true },
  name: { type: String, required: true },
  location: String,
  description: String,
  phone: String,
  timing: String,
  deliveryModeAllowed: Boolean,
  profilePicUrl: String
});

const RestaurantModel = mongoose.model('Restaurant', RestaurantSchema);

const Restaurant = function(restaurant) {
  this.credId = restaurant.credId;
  this.name = restaurant.fullname;
  this.location = restaurant.location;
  this.description = restaurant.description;
  this.phone = restaurant.phone;
  this.timing = restaurant.timing;
  this.deliveryModeAllowed = restaurant.deliveryModeAllowed;
  this.profilePicUrl = restaurant.profilePicUrl;
};

Restaurant.create = (restaurant) => {
  return new Promise(resolve => {
    RestaurantModel.create(restaurant, (err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, { ...restaurant, _id: result._id }]);
    });
  });
}

Restaurant.update = (restaurant) => {
  return new Promise(resolve => {
    RestaurantModel.updateOne(
      { credId: restaurant.credId },
      restaurant,
      {},
      (err) => {
        if (err) {
          resolve([err, null]);
          return;
        }
    
        resolve([null, restaurant]);
      }
    )
  });
}

Restaurant.find = (restaurant) => {
  return new Promise(resolve => {
    RestaurantModel.findOne({ credId: restaurant.credId })
    .exec((err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, result]);
    });
  });
}

Restaurant.findMultiple = (restIds) => {
  return new Promise(resolve => {
    RestaurantModel.find({credId: restIds})
    .exec((err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, result]);
    });
  });
}

Restaurant.findAll = (filters) => {
  return new Promise(resolve => {
    let match = {};
    // let sqlQuery =  'select * from restaurantProfile';
    // let values = [];
    // let addConnectors = false;

    if (filters) {
      if (filters.deliveryMode) {
        match.deliveryModeAllowed = true;
        // sqlQuery += ' where deliveryModeAllowed = ?';
        // values.push(1);
        // addConnectors = true;
      }
  
      if (filters.searchText) {
        match.name = new RegExp(filters.searchText,'i');
        match.location = new RegExp(filters.searchText,'i');
        // const connectingText = addConnectors ? ' and' : ' where';
        // sqlQuery += `${connectingText} (name like '%${filters.searchText}%' or location like '%${filters.searchText}%')`;
      }
    }

    console.log('---SQL FILTERS----', filters)
    console.log('---SQL----', match)

    RestaurantModel.find(match)
    .exec((err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, result]);
    });
  });
}

export default Restaurant;