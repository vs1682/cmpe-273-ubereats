import OrderService from './Order.js';
import CustomerService from './Customer.js';

const serviceMap = {
  order: OrderService,
  customer: CustomerService
};

async function handle_request(data, callback){
  
  console.log("Inside kafka backend");
  console.log(data);

  const [err, serviceData] = await serviceMap[data.service][data.method](...data.data);

  if (err) {
    callback(err, null);
  } else {
    callback(null, serviceData);
  }
  console.log("after callback");
};

export default {
  handle_request
};