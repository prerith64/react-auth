import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const mongodbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return; // ✅ Prevent multiple connections

  try {
    await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("🔥 MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

export default mongodbConnect;
