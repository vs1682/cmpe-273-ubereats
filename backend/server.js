import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Kafka } from 'kafkajs';
import passport from 'passport';

import './models/db.js';
// import './middlewares/authentication.js';
import credsRoutes from './routes/creds.js';
import restaurantRoutes from './routes/restaurant.js';
import dishRoutes from './routes/dish.js';
import uploadRoutes from './routes/upload.js';
import locationRoutes from './routes/location.js';
import customerRoutes from './routes/customer.js';
import orderRoutes from './routes/order.js';

const app = express();

app.use(cors('http://localhost:3000'));
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

// const kafka = new Kafka({
//   clientId: 'my-app',
//   brokers: ['localhost:9092']
// });

// const producer = kafka.producer()

// await producer.connect()
// await producer.send({
//   topic: 'test-topic',
//   messages: [
//     { value: 'Hello KafkaJS user!' },
//   ],
// })

// const consumer = kafka.consumer({ groupId: 'test-group' })

// await consumer.connect()
// await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

// await consumer.run({
//   eachMessage: async ({ topic, partition, message }) => {
//     console.log({
//       value: message.value.toString(),
//       name: 'vishal'
//     })
//   },
// })

// await producer.disconnect()

app.use('/api/creds', credsRoutes);

app.use('/api/restaurant', restaurantRoutes);

app.use('/api/customer', customerRoutes);

app.use('/api/dish', dishRoutes);

app.use('/api/upload', uploadRoutes);

app.use('/api/countries', locationRoutes);

app.use('/api/order', orderRoutes);

// set port, listen for requests
app.listen(8000, () => {
  // console.log("Server is running on port 8000.");
});

export default app;