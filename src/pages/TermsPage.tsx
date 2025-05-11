import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import { getTerms } from '../utils/api';
import './TermsPage.css';

const TermsPage = () => {
  const { i18n } = useTranslation();
  const [termsContent, setTermsContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        setLoading(true);
        const data = await getTerms(i18n.language);
        setTermsContent(data.content);
        setLoading(false);
      } catch (err) {
        setError('Failed to load terms content');
        setLoading(false);
        console.error('Error fetching terms:', err);
        const fallbackContent =
          i18n.language === 'en'
            ? `<h1>Terms and Conditions</h1><p>... (English content)</p>`
            : `<h1>Allmänna villkor</h1><p>... (Swedish content)</p>`;
        setTermsContent(fallbackContent);
      }
    };

    fetchTerms();
  }, [i18n.language]);

  return (
    <div className="terms-page">
      <Header />
      <main className="terms-main">
        <div className="terms-hero">
          <div className="terms-hero-overlay">
            <div className="terms-hero-content">
              <img
                src="https://storage.123fakturera.se/public/icons/diamond.png"
                alt="123Fakturera"
                className="terms-hero-logo"
              />
              <h1 className="terms-hero-title">123Fakturera</h1>
            </div>
          </div>
        </div>

        <div className="terms-container">
          <div className="terms-content-wrapper">
            {loading ? (
              <div className="terms-loading">
                <div className="terms-spinner" />
              </div>
            ) : error ? (
              <div className="terms-error">
                <p>{error}</p>
              </div>
            ) : (
              <div
                className="terms-content prose"
                dangerouslySetInnerHTML={{ __html: termsContent }}
              />
            )}
          </div>
        </div>
      </main>

      <footer className="terms-footer">
        <p>&copy; {new Date().getFullYear()} 123Fakturera. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TermsPage;
