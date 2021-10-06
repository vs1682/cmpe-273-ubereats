import express from 'express';
import bodyParser from 'body-parser';

// import authenticateTokenMiddleware from './middlewares/authentication.js';
import credsRoutes from './routes/creds.js';
import restaurantRoutes from './routes/restaurant.js';
import dishRoutes from './routes/dish.js';
import uploadRoutes from './routes/upload.js';
import locationRoutes from './routes/location.js';
import customerRoutes from './routes/customer.js';

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log('---REQUEST BODY---', req.body);
  } else {
    console.log('---REQUEST QUERY---', req.query);
    console.log('---REQUEST PARAM---', req.params);
  }
  // console.log('---REQUEST PARAM---', req.file, req.files);

  next();
});

app.use('/api/creds', credsRoutes);

app.use('/api/restaurant', restaurantRoutes);

app.use('/api/customer', customerRoutes);

app.use('/api/dish', dishRoutes);

app.use('/api/upload', uploadRoutes);

app.use('/api/countries', locationRoutes);

// set port, listen for requests
app.listen(8000, () => {
  console.log("Server is running on port 8000.");
});