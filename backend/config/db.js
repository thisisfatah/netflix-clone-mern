import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV_VARS.MONGODB_URI);
    console.log("MongoDB connected" + conn.connection.host);
  } catch (err) {
    console.error("Error connecting to MongoDB:" + err.message);
    process.exit(1);
  }
};
