import express from 'express';
import bodyParser from 'body-parser';

import authenticateTokenMiddleware from './middlewares/authentication.js';
import credsRoutes from './routes/creds.js';
import restaurantRoutes from './routes/restaurant.js';
import dishRoutes from './routes/dish.js';

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log('---REQUEST---', req.body);
  } else {
    console.log('---REQUEST QUERY---', req.query);
    console.log('---REQUEST PARAM---', req.params);
  }

  next();
});

app.use('/api/creds', credsRoutes);

app.use('/api/restaurant', restaurantRoutes);

app.use('/api/dish', dishRoutes);

// set port, listen for requests
app.listen(8000, () => {
  console.log("Server is running on port 8000.");
});