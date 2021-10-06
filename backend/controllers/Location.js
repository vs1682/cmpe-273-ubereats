import LocationService from "../services/Location.js";

const LocationController = {};

LocationController.getCountries = async (req, res)  => {
  res.send(LocationService.getCountries());
}

LocationController.getStates = async (req, res)  => {
  if (!req.params) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  res.send(LocationService.getStates(req.params.country));
}

LocationController.getCities = async (req, res)  => {
  if (!req.params) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  res.send(LocationService.getCities(req.params.country, req.params.state));
}

LocationController.getDetails = async (req, res)  => {
  if (!req.query) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  res.send(LocationService.getDetails(req.query.country, req.query.state, req.query.city));
}

export default LocationController;