import express from "express";
import { sendQuote } from "../controllers/quoteController.js";

const router = express.Router();

router.post("/", sendQuote);

export default router;