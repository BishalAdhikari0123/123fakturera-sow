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

function getDefaultEnglishTerms() {
  return `
    <h1>Terms and Conditions</h1>
    <p>Welcome to 123Fakturera, the invoicing service that makes it easy for you to create and manage your invoices.</p>
    <!-- Rest of the English terms content -->
  `;
}

function getDefaultSwedishTerms() {
  return `
    <h1>Allmänna villkor</h1>
    <p>Välkommen till 123Fakturera, faktureringstjänsten som gör det enkelt för dig att skapa och hantera dina fakturor.</p>
    <!-- Rest of the Swedish terms content -->
  `;
}