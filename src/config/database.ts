import mongoose from "mongoose";
import { ENV } from "./env";

/**
 * Connect to MongoDB
 */
export const connectToDatabase = async (): Promise<void> => {
  try {
    const mongoURI = ENV.MONGO_URI || "mongodb://localhost:27017/your_database_name";

    // Connect to MongoDB
    await mongoose.connect(mongoURI);

    console.log("🔥 Connected to MongoDB successfully!");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1); // Exit the application if the connection fails
  }
};

/**
 * Disconnect from MongoDB
 */
export const disconnectFromDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB successfully!");
  } catch (error) {
    console.error("❌ Error disconnecting from MongoDB:", error);
  }
};
