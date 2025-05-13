import { Routes, Route } from 'react-router-dom';
import TermsPage from './pages/TermsPage';
import PriceListPage from './pages/PriceListPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PriceListPage />} />
      <Route path="/terms" element={<TermsPage />} />
    </Routes>
  );
}

export default App;
