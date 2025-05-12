import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './TermsHeader.css';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1200);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="site-header">
      <div className="header-container">

        {isMobile ? (
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>
        ) : (
          <Link to="/" className="header-logo">
            <img
              src="/app-icon/diamond.png"
              alt="123Fakturera Logo"
            />
          </Link>
        )}

        {!isMobile && (
          <nav className="header-nav">
            <Link to="/terms">{t('Home')}</Link>
            <Link to="/privacy">{t('Order')}</Link>
            <Link to="/contact">{t('Our Customers')}</Link>
            <Link to="/contact">{t('About us')}</Link>
            <Link to="/contact">{t('Contact Us')}</Link>
          </nav>
        )}

        <div className="header-lang-switch">
          {i18n.language !== 'en' && (
            <div className="lang-option" onClick={() => changeLanguage('en')}>
              <span>English</span>
              <img
                src="/flag-images/GB.png"
                alt="English"
                className="language-flag"
              />
            </div>
          )}
          {i18n.language !== 'sv' && (
            <div className="lang-option" onClick={() => changeLanguage('sv')}>
              <span>Svenska</span>
              <img
                src="/flag-images/SE.png"
                alt="Svenska"
                className="language-flag"
              />
            </div>
          )}
        </div>
      </div>

      {isMobile && menuOpen && (
        <div className="mobile-nav">
          <Link to="/terms" onClick={() => setMenuOpen(false)}>{t('Home')}</Link>
          <Link to="/privacy" onClick={() => setMenuOpen(false)}>{t('Order')}</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>{t('Our Customers')}</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>{t('About us')}</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>{t('Contact Us')}</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
