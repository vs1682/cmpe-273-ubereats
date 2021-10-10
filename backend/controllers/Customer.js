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

CustomerController.getFavorites = async (req, res) => {
  if (!req.params) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  const [err, data] = await CustomerService.findFavorites({ custId: req.params.id });

  if (err) {
    res.status(500).send({
      message:
      err.message || "Some error occurred while fetching profile."
    });
  }

  res.json(data);
}

CustomerController.addAddress = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  const [err, data] = await CustomerService.addAddress(req.body);

  if (err) {
    res.status(500).send({
      message:
      err.message || "Some error occurred while adding address."
    });
  }

  res.json(data);
}

CustomerController.getAddress = async (req, res) => {
  if (!req.query) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  const [err, data] = await CustomerService.findAddress(req.query);

  if (err) {
    res.status(500).send({
      message:
      err.message || "Some error occurred while fetching address."
    });
  }

  res.json(data);
}

CustomerController.getAllAddresses = async (req, res) => {
  if (!req.query) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  const [err, data] = await CustomerService.findAllAddress(req.query);

  if (err) {
    res.status(500).send({
      message:
      err.message || "Some error occurred while fetching address."
    });
  }

  res.json(data);
}

export default CustomerController;