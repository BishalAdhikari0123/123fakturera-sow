import express from 'express';
import { getTerms } from '../controllers/termsController.js';

const router = express.Router();

router.get('/', getTerms);

export default router;