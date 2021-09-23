import Creds from '../services/Creds.js';
import Customer from '../services/Customer.js';
import Restaurant from '../services/Restaurant.js';
import { USER_TYPE } from '../utils/constants.js';

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

  let profileErr = null;
  let profileData = {};

  if (data.accountRole === USER_TYPE.customer) {
    [profileErr, profileData] = await Customer.create({
      fullname: req.body.fullname,
      credId: data.id
    });
  } else {
    [profileErr, profileData] = await Restaurant.create({
      fullname: req.body.fullname,
      location: req.body.location,
      credId: data.id
    });
  }
  
  if (profileErr) {
    res.status(500).send({
      message:
      profileErr.message || "Some error occurred while creating the Creds."
    });
  }

  res.json({
    email: data.email,
    accountRole: data.accountRole,
    token: data.token,
    ...profileData
  });
}

CredsController.signIn = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  const [err, data] = await Creds.find(req.body);

  if (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Creds."
    });
  }

  let profileErr = null;
  let profileData = {};

  if (data.accountRole === USER_TYPE.customer) {
    [profileErr, profileData] = await Customer.find({
      credId: data.id
    });
  } else {
    [profileErr, profileData] = await Restaurant.find({
      credId: data.id
    });
  }
  
  if (profileErr) {
    res.status(500).send({
      message:
      profileErr.message || "Some error occurred while fetching profile."
    });
  }

  res.json({
    email: data.email,
    accountRole: data.accountRole,
    token: data.token,
    ...profileData
  });
}

export default CredsController;