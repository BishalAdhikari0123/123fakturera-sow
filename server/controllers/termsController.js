import { getTermsByLanguage, saveTerms } from '../services/termsService.js';

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

export const saveTermsController = async (req, res, next) => {
  try {
    const { language, termsContent } = req.body;
    const existingTerms = await getTermsByLanguage(language);

    if (existingTerms) {
      // If terms for the language exist, update them
      existingTerms.content = termsContent;
      await existingTerms.save();
      return res.json({ message: `Terms for ${language} updated successfully!` });
    }

    // If terms don't exist, create a new document
    const newTerms = await saveTerms(language, termsContent);
    res.json({ message: `Terms for ${language} saved successfully!`, terms: newTerms });
  } catch (error) {
    next(error);
  }
};
