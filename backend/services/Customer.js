import Customer, { CustomerFavorite, CustomerAddress } from '../models/Customer.js';
import Restaurant from '../models/Restaurant.js';

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

CustomerService.favorite = (query) => {
  const { custId, restId } = query;

  const favorite = new CustomerFavorite({
    custId,
    restId
  });

  return Customer.favorite(favorite);
}

CustomerService.findFavorites = async (query) => {
  const { custId } = query;

  const [err, result] = await Customer.findFavorites(custId);
  
  if (!err) {
    const restIds = result.map(r => r.restId);

    let [errRest, restaurants] = await Restaurant.findMultiple(restIds);

    if (!errRest) {
      restaurants = restaurants.map(r => {
        r.isFavorite = true;
        return r;
      });
    }

    return [errRest, restaurants];
  }

  return [err, null];
}

CustomerService.addAddress = (query) => {
  const { custId, address } = query;

  const newAddress = new CustomerAddress({
    custId,
    address
  });

  return Customer.addAddress(newAddress);
}

CustomerService.findAddress = (query) => {
  const { custId, addressId } = query;

  return Customer.findAddress(custId, addressId);
}

CustomerService.findAllAddress = (query) => {
  const { custId } = query;

  return Customer.findAllAddress(custId);
}

export default CustomerService;