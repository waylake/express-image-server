import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || "";
const NODE_ENV = process.env.NODE_ENV || "";
const JWT_SECRET = process.env.JWT_SECRET || "";
const API_VERSION = process.env.API_VERSION || "";
const MONGO_URI = process.env.MONGO_URI || "";

export const envConfig = {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  API_VERSION,
  MONGO_URI,
};
