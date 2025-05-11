import express from 'express';
import { getFlagImage } from '../controllers/imgController.js';

const imgRouter = express.Router();

imgRouter.get('/proxy-flag/:code', getFlagImage);

export default imgRouter;
