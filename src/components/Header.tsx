import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Header.css';

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
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          {showSidebar ? (
            <button onClick={toggleMenu} className="menu-button" aria-label="Menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          ) : (
            <button onClick={toggleMenu} className="menu-button" aria-label="Menu">
              <Menu size={24} />
            </button>
          )}
          {userName && companyName && (
            <div className="user-info">
              <div className="user-avatar">
                <span className="user-initials">{userName.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div>
                <p className="user-name">{userName}</p>
                <p className="company-name">{companyName}</p>
              </div>
            </div>
          )}
        </div>
        <div className="header-right">
          <button 
            onClick={toggleLanguage} 
            className="language-button"
          >
            <span className="language-text">{t('language')}</span>
           <img
            src={`/proxy-flag/${i18n.language === 'en' ? 'GB' : 'SE'}`} // Dynamically using proxy-flag based on the language
            alt={i18n.language === 'en' ? 'English' : 'Svenska'}
            className="language-flag"
            />


          </button>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'visible' : 'hidden'}`}>
        <div className={`mobile-menu ${isMenuOpen ? 'visible' : 'hidden'}`}>
          <div className="mobile-menu-header">
            <span className="mobile-menu-title">{t('header.menu')}</span>
            <button onClick={toggleMenu} className="mobile-menu-close">
              <X size={20} />
            </button>
          </div>
          <nav className="mobile-menu-nav">
            <ul className="mobile-menu-list">
              <li>
                <Link 
                  to="/" 
                  className="mobile-menu-link"
                  onClick={toggleMenu}
                >
                  {t('pricelist.title')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="mobile-menu-link"
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