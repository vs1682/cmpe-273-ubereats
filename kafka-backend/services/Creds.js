import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import Creds from '../models/Creds.js';

const generateToken = (user) => {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

const CredsService = {};

CredsService.create = async (query) => {
  const { email, pwd, accountRole } = query;

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(pwd, salt);

  const creds = new Creds({
    email,
    pwd: password,
    accountRole
  });

  const [err, data] = await Creds.create(creds);

  if (data) {
    data.token = generateToken({email});
  }

  return [err, data];
}

CredsService.find = async (query) => {
  const { email, pwd, accountRole } = query;

  const creds = new Creds({
    email,
    pwd,
    accountRole
  });

  let [err, data] = await Creds.find(creds);

  if (err) {
    return [err, data];
  }

  const pwdValid = await bcrypt.compare(pwd, data.pwd);

  if (!pwdValid) {
    err = 'Invalid Credentials';
  } else if (data) {
    data.token = generateToken({email});
  }

  return [err, data];
}

export default CredsService;