import mongoose from 'mongoose';
import 'dotenv/config';

const { DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

// Create a connection to the database
const connectToMongo = async () => {
  const connectionStr = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.zpvyv.mongodb.net/${DB_DATABASE}?retryWrites=true&w=majority`;
  await mongoose.connect(connectionStr);
  console.log("Successfully connected to the database.");
}

// open the MySQL connection
// connection.connect(error => {
//   if (error) throw error;
//   console.log("Successfully connected to the database.");
// });
connectToMongo();

export default {};