import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/products");

    console.log("connected to DB...");
  } catch (error) {
    console.log("Failed to connect DB...");
  }
};

export default connectDB;
