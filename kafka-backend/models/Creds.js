import mongoose from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

// import db from './db.js';

const CredSchema = new mongoose.Schema({
  email: String,
  pwd: String,
  accountRole: String
});

CredSchema.virtual('id').get(function() {
  return this._id.toString();
});

CredSchema.plugin(mongooseLeanVirtuals);

const CredsModel = mongoose.model('Creds', CredSchema);

const Creds = function(creds) {
  this.email = creds.email;
  this.pwd = creds.pwd;
  this.accountRole = creds.accountRole;
};

Creds.create = (creds) => {
  return new Promise(resolve => {
    CredsModel.create(creds, (err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, { id: result._id, ...creds }]);
    });
  });
}

Creds.find = (creds) => {
  return new Promise(resolve => {
    CredsModel.find({
      email: creds.email,
      accountRole: creds.accountRole
    })
    .lean({ virtuals: true })
    .exec((err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }

      if (!result.length) {
        resolve([{ message: 'User Not Found' }, null]);
        return;
      }
  
      resolve([null, result[0]]);
    });
  });
}

export default Creds;