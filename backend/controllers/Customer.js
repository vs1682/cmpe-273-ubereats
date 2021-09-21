import Customer from '../models/Customer.js';

const CustomerController = {};

CustomerController.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  const { credId, fullname } = req.body;

  const customer = new Customer({
    credId,
    fullname
  });

  Customer.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
}

export default CustomerController;