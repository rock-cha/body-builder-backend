import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import quoteRoutes from "./routes/quoteRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/quote", quoteRoutes);
app.use("/api/reviews", reviewRoutes);

// Database Connection & Server Listen
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas Connected Successfully! 🍃");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error ❌:", err.message);
  });