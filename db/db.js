const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Successfully connected to MongoDB database!');
  } catch (error) {
    console.error('Connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
