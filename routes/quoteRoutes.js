import express from "express";
import { sendQuote } from "../Controllers/quoteControllers";

const router = express.Router();

router.post("/", sendQuote);

export default router;