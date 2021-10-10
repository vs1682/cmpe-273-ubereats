import db from './db.js';

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

const CustomerFavorite = function(favorite) {
  this.custId = favorite.custId;
  this.restId = favorite.restId;
}

const CustomerAddress = function(addressDetails) {
  this.id = addressDetails.id;
  this.custId = addressDetails.custId;
  this.address = addressDetails.address;
}

Customer.create = (customer) => {
  return new Promise(resolve => {
    db.query("insert into custProfile SET ?", customer, (err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, { id: result.insertId, ...customer }]);
    });
  });
}

Customer.find = (customer) => {
  return new Promise(resolve => {
    db.query(
      'select cp.*, c.email from custProfile cp join creds c on cp.credId = c.id where cp.credId=?',
      [customer.credId],
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

Customer.findMultiple = (customerIds) => {
  return new Promise(resolve => {
    db.query(
      'select cp.*, c.email from custProfile cp join creds c on cp.credId = c.id where cp.credId in (?)',
      [customerIds],
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

Customer.update = (customer) => {
  return new Promise(resolve => {
    db.query(
      'update custProfile SET ? where credId=?',
      [customer, customer.credId],
      (err) => {
        if (err) {
          resolve([err, null]);
          return;
        }
    
        resolve([null, customer]);
      }
    );
  });
}

Customer.favorite = (customerFavorite) => {
  return new Promise(resolve => {
    db.query(
      'insert into favorite SET ?',
      [customerFavorite],
      (err, result) => {
        if (err) {
          resolve([err, null]);
          return;
        }
    
        resolve([null, { id: result.insertId, ...customerFavorite }]);
      }
    );
  });
}

Customer.findFavorites = (custId) => {
  return new Promise(resolve => {
    db.query(
      'select * from favorite where custId = ?',
      [custId],
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

Customer.addAddress = (address) => {
  return new Promise(resolve => {
    db.query(
      'insert into deliveryAddress SET ?',
      [address],
      (err, result) => {
        if (err) {
          resolve([err, null]);
          return;
        }
    
        resolve([null, { ...address, id: result.insertId }]);
      }
    );
  });
}

Customer.findAllFavoritesById = (custId) => {
  return new Promise(resolve => {
    db.query(
      'select restId from favorite where custId = ?',
      [custId],
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

Customer.findAddress = (custId, addressId) => {
  return new Promise(resolve => {
    db.query(
      'select * from deliveryAddress where custId = ? and id = ?',
      [custId, addressId],
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

Customer.findAllAddress = (custId) => {
  return new Promise(resolve => {
    db.query(
      'select * from deliveryAddress where custId = ?',
      [custId],
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

export {
  CustomerFavorite,
  CustomerAddress
};

export default Customer;