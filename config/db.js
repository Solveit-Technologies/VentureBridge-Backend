// config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const uri = String(process.env.DATABASE_URL) || "";
    const MongoDBInstance = await mongoose.connect(
      `${uri}/${process.env.DB_NAME}`
    );
    console.log(
      `MongoDb connected at DB HOST: ${MongoDBInstance.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB connection failed", error.message);
    process.exit(1);
  }
};

export default connectDB;
 