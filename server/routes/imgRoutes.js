import express from 'express';
import { getFlagImage, getWallpaperImage } from '../controllers/imgController.js';

const imgRouter = express.Router();

imgRouter.get('/proxy-flag/:code', getFlagImage);

imgRouter.get('/wallpapers/:file', getWallpaperImage);

export default imgRouter;
