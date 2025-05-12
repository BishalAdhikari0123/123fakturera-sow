import express from 'express';
import { getTerms, saveTermsController } from '../controllers/termsController.js';

const router = express.Router();

router.get('/', getTerms);

router.post('/save-terms', saveTermsController);

export default router;