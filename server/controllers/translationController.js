import { getTranslationsByLanguage } from '../services/translationService.js';

export const getTranslations = async (req, res, next) => {
  try {
    const { language = 'en' } = req.query;
    const translations = await getTranslationsByLanguage(language);
    res.json(translations);
  } catch (error) {
    next(error);
  }
};