import { useTranslation } from 'react-i18next';
import './css/LanguageSwitcher.css';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher = ({ className = '' }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'sv' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button 
      onClick={toggleLanguage}
      className={`language-switcher ${className}`}
      aria-label={`Switch to ${i18n.language === 'en' ? 'Swedish' : 'English'}`}
    >
      <img 
        src={`https://storage.123fakturere.no/public/flags/${i18n.language === 'en' ? 'GB' : 'SE'}.png`} 
        alt={i18n.language === 'en' ? 'English' : 'Svenska'} 
        className="language-flag"
      />
    </button>
  );
};

export default LanguageSwitcher;