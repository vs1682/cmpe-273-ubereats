import express from 'express';
import bodyParser from 'body-parser';

import authenticateTokenMiddleware from './middlewares/authentication.js';
import credsRoutes from './routes/creds.js';

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log('---REQUEST---', req.body);

  next();
});

app.use('/api/creds', credsRoutes);

// set port, listen for requests
app.listen(8000, () => {
  console.log("Server is running on port 8000.");
});