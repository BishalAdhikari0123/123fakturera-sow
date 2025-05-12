import Terms from '../models/Terms.js';

export const getTermsByLanguage = async (language) => {
  try {
    const terms = await Terms.findOne({
      where: { language },
      order: [['id', 'DESC']],
    });
    return terms;
  } catch (error) {
    throw new Error('Error fetching terms: ' + error.message);
  }
};

export const saveTerms = async (language, content) => {
  try {
    const newTerms = await Terms.create({
      language,
      content,
    });
    return newTerms;
  } catch (error) {
    throw new Error('Error saving terms: ' + error.message);
  }
};