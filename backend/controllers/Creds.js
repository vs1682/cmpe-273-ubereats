import Creds from '../services/Creds.js';
import Customer from '../services/Customer.js';

const CredsController = {};

CredsController.create = async (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  const [err, data] = await Creds.create(req.body);

  if (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Creds."
    });
  }

  const [custErr, custData] = await Customer.create({
    fullname: req.body.fullname,
    credId: data.id
  });
  
  if (custErr) {
    res.status(500).send({
      message:
      custErr.message || "Some error occurred while creating the Creds."
    });
  }

  res.send({
    email: data.email,
    accountRole: data.accountRole,
    ...custData
  });
}

export default CredsController;