import CustomerService from '../services/Customer.js';

const CustomerController = {};

CustomerController.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  const { id } = req.params;

  const [err, data] = await CustomerService.update({ credId: id, ...req.body });

  if (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while updating the Customer."
    });
  }

  res.json(data);
}

CustomerController.getProfile = async (req, res) => {
  if (!req.params) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  const [err, data] = await CustomerService.find({ credId: req.params.id });

  if (err) {
    res.status(500).send({
      message:
      err.message || "Some error occurred while fetching profile."
    });
  }

  res.json(data);
}

CustomerController.favorite = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  const [err, data] = await CustomerService.favorite(req.body);

  if (err) {
    res.status(500).send({
      message:
      err.message || "Some error occurred while adding favorite."
    });
  }

  res.json(data);
}

export default CustomerController;