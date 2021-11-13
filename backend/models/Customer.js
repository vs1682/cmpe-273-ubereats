import mongoose from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import _ from 'lodash';
// import db from './db.js';
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  credId: {type: Schema.Types.ObjectId, ref: 'Creds', required: true},
  fullname: {type: String, required: true},
  dob: Date,
  city: Number,
  state: String,
  country: String,
  nickname: String,
  phone: String,
  profilePicUrl: String,
  about: String,
});

const CustomerModel = mongoose.model('Customer', CustomerSchema);

const Customer = function(customer) {
  this.credId = customer.credId;
  this.fullname = customer.fullname;
  this.dob = customer.dob;
  this.city = customer.city;
  this.state = customer.state;
  this.country = customer.country;
  this.nickname = customer.nickname;
  this.phone = customer.phone;
  this.profilePicUrl = customer.profilePicUrl;
  this.about = customer.about;
};

const CustomerFavoriteSchema = mongoose.Schema({
  custId: {type: Schema.Types.ObjectId, ref: 'Customer', required: true},
  restId: {type: Schema.Types.ObjectId, ref: 'Restaurant', required: true},
});

const CustomerFavoriteModel = mongoose.model('CustomerFavorite', CustomerFavoriteSchema);

const CustomerFavorite = function(favorite) {
  this.custId = favorite.custId;
  this.restId = favorite.restId;
}

const CustomerAddressSchema = mongoose.Schema({
  custId: {type: Schema.Types.ObjectId, ref: 'Customer', required: true},
  address: String,
});

CustomerAddressSchema.virtual('id').get(function() {
  return this._id.toString();
});

CustomerAddressSchema.plugin(mongooseLeanVirtuals);

const CustomerAddressModel = mongoose.model('CustomerAddress', CustomerAddressSchema);

const CustomerAddress = function(addressDetails) {
  this.id = addressDetails.id;
  this.custId = addressDetails.custId;
  this.address = addressDetails.address;
}

Customer.create = (customer) => {
  return new Promise(resolve => {
    CustomerModel.create(customer, (err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, {...customer, _id: result._id }]);
    });
  });
}

Customer.find = (customer) => {
  return new Promise(resolve => {
    CustomerModel.aggregate()
    .match({credId: mongoose.Types.ObjectId(customer.credId)})
    .lookup({
      from: 'creds',
      localField: 'credId',
      foreignField: '_id',
      as: 'credentials'
    })
    .unwind('credentials')
    .exec((err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, {..._.omit(result[0], 'credentials'), email: result[0].credentials.email}]);
    });
  });
}

Customer.findMultiple = (customerIds) => {
  return new Promise(resolve => {
    CustomerModel.aggregate()
    .match({credId: { $in: customerIds }})
    .lookup({
      from: 'creds',
      localField: 'credId',
      foreignField: '_id',
      as: 'credentials'
    })
    .unwind('credentials')
    .exec((err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, result]);
    })
  });
}

Customer.update = (customer) => {
  return new Promise(resolve => {
    CustomerModel.updateOne(
      { credId: customer.credId },
      customer,
    )
    .lean()
    .exec((err) => {
      if (err) {
        resolve([err, null]);
        return;
      }

      resolve([null, customer]);
    })
  });
}

Customer.favorite = (customerFavorite) => {
  return new Promise(resolve => {
    CustomerFavoriteModel.create(customerFavorite, (err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, {...customerFavorite, _id: result._id }]);
    })
  });
}

Customer.findFavorites = (custId) => {
  return new Promise(resolve => {
    CustomerFavoriteModel.find({ custId })
    .lean()
    .exec((err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, result]);
    });
  });
}

Customer.addAddress = (address) => {
  return new Promise(resolve => {
    CustomerAddressModel.create(address, (err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, { ...address, id: result._id }]);
    })
  });
}

Customer.findAllFavoritesById = (custId) => {
  return new Promise(resolve => {
    CustomerFavoriteModel.find(
      { custId },
      'restId',
    )
    .lean({ virtuals: true })
    .exec((err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, result]);
    });
  });
}

Customer.findAddress = (custId, addressId) => {
  return new Promise(resolve => {
    CustomerAddressModel.findOne({ custId, _id: addressId })
    .lean({ virtuals: true })
    .exec((err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, result]);
    });
  });
}

Customer.findAllAddress = (custId) => {
  return new Promise(resolve => {
    CustomerAddressModel.find({ custId })
    .lean({ virtuals: true })
    .exec((err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, result]);
    });
  });
}

export {
  CustomerFavorite,
  CustomerAddress
};

export default Customer;