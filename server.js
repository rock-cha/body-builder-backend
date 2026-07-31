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

// Root route (Render health check-க்காக)
app.get("/", (req, res) => {
  res.send("Backend Server is Running...");
});

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000, // 5 வினாடிகளுக்குள் டேட்டாபேஸ் இணையவில்லை என்றால் Error காட்டும்
  })
  .then(() => {
    console.log("MongoDB Atlas Connected Successfully! 🍃");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error ❌:", err.message);
  });

// Server-ஐ தனியாக Listen செய்ய வைக்க வேண்டும் (Database தாமதமானாலும் Server ஆன் ஆகும்)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});