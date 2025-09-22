import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("🔍 Connecting to:", process.env.MONGODB_URI); // Debug

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    mongoose.connection.on("connected", () =>
      console.log("✅ Connected to MongoDB Atlas")
    );
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
