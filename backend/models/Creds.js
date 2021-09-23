import db from './db.js';

const Creds = function(creds) {
  this.email = creds.email;
  this.pwd = creds.pwd;
  this.accountRole = creds.accountRole;
};

Creds.create = (creds) => {
  return new Promise(resolve => {
    db.query("insert into creds SET ?", creds, (err, result) => {
      if (err) {
        resolve([err, null]);
        return;
      }
  
      resolve([null, { id: result.insertId, ...creds }]);
    });
  });
}

export default Creds;