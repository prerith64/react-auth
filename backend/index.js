import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongodbConnect from "./db/mongodbConnect.js";
import userRouter from "./Routes/userRoute.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Proper CORS Setup
app.use(cors({
  origin: "https://react-auth-4929.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Basic Route
app.get("/", (req, res) => res.send("Hello from server!"));

// ✅ User Routes
app.use("/user", userRouter);

// ✅ Connect to MongoDB BEFORE starting server
mongodbConnect().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error("🔥 MongoDB Connection Error:", err);
});
