const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URL || process.env.MONGO_URI;

    if (!uri || typeof uri !== 'string') {
      throw new Error(
        `Missing/invalid MongoDB URI in environment. Expected MONGODB_URL or MONGO_URI. Current value: ${String(uri)}`
      );
    }

    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

