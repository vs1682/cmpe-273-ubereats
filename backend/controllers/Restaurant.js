import Restaurant from '../models/Restaurant.js';

const RestaurantController = {};

RestaurantController.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Required fields not present"
    });
  }

  const { credId, fullname } = req.body;

  const customer = new Restaurant({
    credId,
    fullname
  });

  Restaurant.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Restaurant."
      });
    else res.send(data);
  });
}

export default RestaurantController;