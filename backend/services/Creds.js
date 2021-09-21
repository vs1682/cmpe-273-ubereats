import Creds from '../models/Creds.js';

const CredsService = {};

CredsService.create = async (query) => {
  const { email, pwd, accountRole } = query;

  const creds = new Creds({
    email,
    pwd,
    accountRole
  });

  return Creds.create(creds);
}

export default CredsService;