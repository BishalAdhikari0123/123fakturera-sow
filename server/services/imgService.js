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