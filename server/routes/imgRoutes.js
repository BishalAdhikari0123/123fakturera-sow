import express from 'express';
import { getFlagImage } from '../controllers/imgController.js';
import getWallpaperImage from '../controllers/imgController.js';

const imgRouter = express.Router();

imgRouter.get('/proxy-flag/:code', getFlagImage);

imgRouter.get('/wallpapers/:file', getWallpaperImage);

export default imgRouter;
