import axios from 'axios';

export const fetchFlagImage = async (code) => {
  const imageUrl = `https://storage.123fakturere.no/public/flags/${code}.png`;

  const response = await axios.get(imageUrl, {
    responseType: 'arraybuffer',
  });

  return {
    data: response.data,
    contentType: 'image/png',
  };
};

export const fetchWallpaperImage = async (file) => {
  const imageUrl = `https://storage.123fakturera.se/public/wallpapers/sverige43.jpg`;

  try {
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
    });

    return {
      data: response.data,
      contentType: 'image/jpeg',
    };
  } catch (err) {
    throw new Error('Error fetching wallpaper image');
  }
};