import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Default translations - will be replaced by database data
const resources = {
  en: {
    translation: {
      'header.menu': 'Menu',
      'language': 'English',
      'pricelist.title': 'Price List',
      'pricelist.articleNo': 'Article No.',
      'pricelist.product': 'Product/Service',
      'pricelist.inPrice': 'In Price',
      'pricelist.price': 'Price',
      'pricelist.unit': 'Unit',
      'pricelist.inStock': 'In Stock',
      'pricelist.description': 'Description',
      'pricelist.newProduct': 'New Product',
      'pricelist.printList': 'Print List',
      'pricelist.advancedMode': 'Advanced mode',
      'pricelist.search.article': 'Search Article No...',
      'pricelist.search.product': 'Search Product...',
      'notFound.title': 'Page Not Found',
      'notFound.message': 'The page you are looking for does not exist.',
      'notFound.button': 'Go Home',
      'terms.title': 'Terms',
      'terms.closeAndGoBack': 'Close and Go Back',
    }
  },
  sv: {
    translation: {
      'header.menu': 'Meny',
      'language': 'Svenska',
      'pricelist.title': 'Prislista',
      'pricelist.articleNo': 'Artikelnr.',
      'pricelist.product': 'Produkt/Tjänst',
      'pricelist.inPrice': 'Inpris',
      'pricelist.price': 'Pris',
      'pricelist.unit': 'Enhet',
      'pricelist.inStock': 'I lager',
      'pricelist.description': 'Beskrivning',
      'pricelist.newProduct': 'Ny produkt',
      'pricelist.printList': 'Skriv ut lista',
      'pricelist.advancedMode': 'Avancerat läge',
      'pricelist.search.article': 'Sök artikelnummer...',
      'pricelist.search.product': 'Sök produkt...',
      'notFound.title': 'Sidan hittades inte',
      'notFound.message': 'Sidan du letar efter finns inte.',
      'notFound.button': 'Gå hem',
      'terms.title': 'Allmänna villkor',
      'terms.closeAndGoBack': 'Stäng och gå tillbaka',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;