import CustomerService from '../services/Customer.js';
import kafka from '../kafka/client.js';

const CustomerController = {};

CustomerController.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  const { id } = req.params;

  kafka.make_request(
    'post_ubereats_data',
    {
      service: 'customer',
      method: 'update',
      data: [{ credId: id, ...req.body }]
    },
    function(err,results){
      console.log('KAFKA MAKE REQUEST CALLBACK');
      console.log('RESULTS: ', results);
      if (err){
        console.log("ERROR: ", err);
        return res.status(500).send({
          message:
            err.message || "Some error occurred while updating the Customer."
        });
      }else{
        return res.json(results);
      } 
  });

  // const [err, data] = await CustomerService.update({ credId: id, ...req.body });
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