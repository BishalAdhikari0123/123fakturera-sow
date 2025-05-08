import { Routes, Route } from 'react-router-dom';
import TermsPage from './pages/TermsPage';
import PriceListPage from './pages/PriceListPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PriceListPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;