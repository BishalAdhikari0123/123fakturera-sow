import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">{t('notFound.title')}</h2>
          <p className="text-gray-600 mb-8">{t('notFound.message')}</p>
          <Link 
            to="/" 
            className="btn btn-primary inline-block"
          >
            {t('notFound.button')}
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage;