import express from "express";
import { sendQuote } from "../Controllers/quoteConrollers.js"

const router = express.Router();


router.post("/", sendQuote);


export default router;
