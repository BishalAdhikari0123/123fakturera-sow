import { useTranslation } from 'react-i18next';

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
      className={`flex items-center gap-2 ${className}`}
      aria-label={`Switch to ${i18n.language === 'en' ? 'Swedish' : 'English'}`}
    >
      <img 
        src={`https://storage.123fakturere.no/public/flags/${i18n.language === 'en' ? 'GB' : 'SE'}.png`} 
        alt={i18n.language === 'en' ? 'English' : 'Svenska'} 
        className="w-6 h-auto"
      />
    </button>
  );
};

export default LanguageSwitcher;