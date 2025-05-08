import Translation from '../models/Translation.js';

export const getTranslationsByLanguage = async (language) => {
  try {
    const translations = await Translation.findAll({
      where: { language },
    });
    
    const translationDict = {};
    translations.forEach(t => {
      translationDict[t.key] = t.value;
    });
    
    return translationDict;
  } catch (error) {
    throw new Error('Error fetching translations: ' + error.message);
  }
};