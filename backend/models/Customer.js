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

export default Customer;