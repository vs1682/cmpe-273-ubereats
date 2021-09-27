import Customer from '../models/Customer.js';

const CustomerService = {};

CustomerService.create = (query) => {
  const { credId, fullname } = query;

  const customer = new Customer({
    credId,
    fullname
  });

  return Customer.create(customer);
}

CustomerService.find = (query) => {
  const { credId } = query;

  const customer = new Customer({
    credId
  });

  return Customer.find(customer);
}

CustomerService.update = (query) => {
  const {
    credId,
    fullname,
    dob,
    city,
    state,
    country,
    nickname,
    phone,
    profilePicUrl,
    about
  } = query;

  const customer = new Customer({
    credId,
    fullname,
    dob,
    city,
    state,
    country,
    nickname,
    phone,
    profilePicUrl,
    about
  });

  return Customer.find(customer);
}

export default CustomerService;