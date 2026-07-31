import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import quoteRoutes from "./routes/quoteRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/quote", quoteRoutes);
app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});