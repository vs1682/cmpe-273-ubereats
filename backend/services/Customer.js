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

CustomerService.update = (data) => {
  const customer = new Customer(data);

  return Customer.update(customer);
}

export default CustomerService;