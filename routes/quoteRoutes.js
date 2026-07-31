import express from 'express';
import { sendQuoteEmail } from '../Controllers/quoteControllers.js'; // .js சேர்க்க வேண்டும்

const router = express.Router();

// POST /api/quote
router.post('/quote', sendQuoteEmail);

export default router;