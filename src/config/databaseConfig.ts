import mongoose from "mongoose";
import { envConfig, logger } from "@/config";

export const connectMongoDB = () => {
  const uri = envConfig.MONGO_URI;
  try {
    mongoose.connect(uri);
    logger.info("MongoDB Connected");
  } catch (error) {
    logger.error(error);
  }

  const dbConnection = mongoose.connection;

  dbConnection.on("connected", () => {
    logger.info("Mongoose connected to db");
  });

  dbConnection.on("error", (error) => {
    logger.error(error);
  });
};
