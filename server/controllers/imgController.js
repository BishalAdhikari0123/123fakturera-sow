import { fetchFlagImage,fetchWallpaperImage} from '../services/imgService.js';

export const getFlagImage = async (req, res) => {
  const { code } = req.params;

  try {
    const { data, contentType } = await fetchFlagImage(code);
    res.set('Content-Type', contentType);
    res.send(data);
  } catch (err) {
    console.error('Image fetch error:', err.message);
    res.status(500).send('Error fetching image');
  }
};export const getWallpaperImage = async (req, res) => {
  try {
    const { data, contentType } = await fetchWallpaperImage();
    res.set('Content-Type', contentType);
    res.send(Buffer.from(data, 'binary'));
  } catch (err) {
    console.error('Wallpaper image fetch error:', err.message);
    res.status(500).send('Error fetching wallpaper image');
  }
};
