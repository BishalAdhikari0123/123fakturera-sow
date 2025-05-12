import { getTermsByLanguage } from '../services/termsService.js';

export const getTerms = async (req, res, next) => {
  try {
    const { language = 'en' } = req.query;
    const terms = await getTermsByLanguage(language);
    
    if (!terms) {
      // Return default content based on language
      return res.json({
        content: language === 'en' ? getDefaultEnglishTerms() : getDefaultSwedishTerms()
      });
    }
    
    res.json(terms);
  } catch (error) {
    next(error);
  }
};
