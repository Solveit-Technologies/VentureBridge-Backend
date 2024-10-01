// config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

dotenv.config();

const connectDB = async () => {
  try {
    const uri = String(process.env.DATABASE_URL)  || "" ;
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
