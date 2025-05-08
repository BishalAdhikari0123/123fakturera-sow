import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';

interface HeaderProps {
  showSidebar?: boolean;
  userName?: string;
  companyName?: string;
}

const Header = ({ showSidebar = false, userName = "John Andre", companyName = "Storfjord AS" }: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'sv' : 'en';
    i18n.changeLanguage(newLang);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-primary-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {showSidebar ? (
            <button onClick={toggleMenu} className="text-white p-1 focus:outline-none" aria-label="Menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          ) : (
            <button onClick={toggleMenu} className="text-white p-1 focus:outline-none" aria-label="Menu">
              <Menu size={24} />
            </button>
          )}
          {userName && companyName && (
            <div className="hidden md:flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center">
                <span className="font-bold text-lg">{userName.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div>
                <p className="font-semibold">{userName}</p>
                <p className="text-sm text-primary-100">{companyName}</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleLanguage} 
            className="flex items-center gap-2 hover:bg-primary-600 py-1 px-2 rounded transition-colors"
          >
            <span className="hidden md:inline">{t('language')}</span>
            <img
  src={`https://storage.123fakturere.no/public/flags/${i18n.language === 'en' ? 'GB' : 'SE'}.png`}
  alt={i18n.language === 'en' ? 'English' : 'Svenska'}
  className="w-6 h-auto"  // Tailwind class for width and auto height
/>

          </button>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300",
        isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <div className={cn(
          "fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transition-transform duration-300 transform",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="p-4 bg-primary-500 text-white flex justify-between items-center">
            <span className="font-semibold">{t('header.menu')}</span>
            <button onClick={toggleMenu} className="text-white p-1">
              <X size={20} />
            </button>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="block p-2 hover:bg-gray-100 rounded transition-colors"
                  onClick={toggleMenu}
                >
                  {t('pricelist.title')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="block p-2 hover:bg-gray-100 rounded transition-colors"
                  onClick={toggleMenu}
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;