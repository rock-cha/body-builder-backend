import express from 'express';
import { sendQuoteEmail } from '../Controllers/quoteControllers.js'; 

const router = express.Router();

// POST /api/quote
router.post('/quote', sendQuoteEmail);

export default router;