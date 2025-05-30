import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TermsHeader from '../components/TermsHeader';
import { getTerms } from '../utils/api';
import './css/TermsPage.css';

const TermsPage = () => {
  const { t, i18n } = useTranslation();
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
        console.error('Error fetching terms:', err);
        setError('Failed to load terms content');
        const fallbackContent =
          i18n.language === 'en'
            ? `<h1>Terms</h1><p>... (English content)</p>`
            : `<h1>Allmänna villkor</h1><p>... (Swedish content)</p>`;
        setTermsContent(fallbackContent);
        setLoading(false);
      }
    };

    fetchTerms();
  }, [i18n.language]);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="terms-page">
      <TermsHeader />
      <main className="terms-main">
        <div className="terms-header-section">
          <h2>{t('terms.title')}</h2>
        </div>

      <div className="navbar">
        <button className="go-back-button" onClick={handleGoBack}>
          {t('terms.closeAndGoBack')}
        </button>
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

      {/* Reuse the close button at the bottom */}
      <div className="navbar">
        <button className="go-back-button go-back-bottom" onClick={handleGoBack}>
          {t('terms.closeAndGoBack')}
        </button>
      </div>
    </div>
  );
};

export default TermsPage;
