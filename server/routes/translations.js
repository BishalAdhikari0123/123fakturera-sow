import express from 'express';
import { getTranslations } from '../controllers/translationController.js';

const router = express.Router();

router.get('/', getTranslations);

export default router;