import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Search, Plus, Printer, ToggleRight, MoreHorizontal, ArrowRight, ArrowDown } from 'lucide-react';
import { getPriceList, updateProduct } from '../utils/api';
import './PriceListStyles.css';

interface Product {
  id: number;
  articleNo: string;
  productService: string;
  inPrice: string;
  price: string;
  unit: string;
  inStock: string;
  description: string;
}

type EditableCellProps = {
  value: string;
  isEditing: boolean;
  onClick?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const EditableCell = ({
  value,
  isEditing,
  onClick,
  onChange,
  onBlur,
  onKeyDown
}: EditableCellProps) => isEditing ? (
  <input
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    onKeyDown={onKeyDown}
    autoFocus
    className="editable-cell-input"
  />
) : (
  <div onClick={onClick} className="editable-cell">
    {value}
  </div>
);

const PriceListPage = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<{ id: number | null, field: string | null, value: string }>({ id: null, field: null, value: '' });
  const [selectedCell, setSelectedCell] = useState<{ rowId: number, field: string } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPriceList();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const startEditing = (id: number, field: string, value: string) => {
    setEditing({ id, field, value });
    setSelectedCell({ rowId: id, field });
  };

  const saveChanges = async () => {
    const { id, field, value } = editing;
    if (id === null || field === null) return;

    const updated = products.map(p => p.id === id ? { ...p, [field]: value } : p);
    setProducts(updated);
    setEditing({ id: null, field: null, value: '' });
    try {
      await updateProduct(id, { [field]: value });
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') saveChanges();
    else if (e.key === 'Escape') setEditing({ id: null, field: null, value: '' });
  };

  const addNewProduct = () => {
    const id = Math.max(0, ...products.map(p => p.id)) + 1;
    const newProduct: Product = {
      id,
      articleNo: `New-${Date.now().toString().slice(-8)}`,
      productService: 'New product',
      inPrice: '0',
      price: '0',
      unit: 'pieces',
      inStock: '0',
      description: 'Product description'
    };
    setProducts([newProduct, ...products]);
    setTimeout(() => startEditing(id, 'productService', 'New product'), 100);
  };

  return (
    <div className="price-list-page">
      <div className="sticky-header">
        <Header showSidebar />
      </div>

      <div className="price-list-content">
        <Sidebar />
        <main className="price-list-main">
          <div className="price-list-container">
            <div className="price-list-actions">
              <div className="price-list-search">
                {[t('pricelist.search.article'), t('pricelist.search.product')].map((placeholder, i) => (
                  <div key={i} className="search-container">
                    <input type="text" placeholder={placeholder} className="search-input" />
                    <Search className="search-icon" size={18} />
                  </div>
                ))}
              </div>
              <div className="price-list-buttons">
                <button onClick={addNewProduct} className="btn btn-primary-pl">
                  <Plus size={18} /><span className="btn-text-hidden">{t('pricelist.newProduct')}</span>
                </button>
                <button className="btn btn-primary-pl">
                  <Printer size={18} /><span className="btn-text-hidden">{t('pricelist.printList')}</span>
                </button>
                <button className="btn btn-primary-pl">
                  <ToggleRight size={18} /><span className="btn-text-hidden">{t('pricelist.advancedMode')}</span>
                </button>
              </div>
            </div>

            {loading ? (
              <div className="price-list-loading">
                <div className="price-list-spinner"></div>
              </div>
            ) : error ? (
              <div className="price-list-error">{error}</div>
            ) : (
              <div className="price-list-table-container">
                <table className="price-list-table">
                  <thead className="sticky-header">
                    <tr>
                      <th className="arrow-column"></th>
                      {["articleNo", "product", "inPrice", "price", "unit", "inStock", "description"].map((key) => {
  let className = "desktop-only";
  if (["product", "price"].includes(key)) className = "mobile-visible";
  else if (["unit", "inStock"].includes(key)) className = "tablet-visible";
  if (["inPrice", "description"].includes(key)) className += " hide-on-ipad"; 
  return (
    <th key={key} className={className}>
      <div className="header-with-arrow">
        {t(`pricelist.${key}`)}
        {selectedCell?.field === key && <ArrowDown size={16} className="column-arrow" />}
      </div>
    </th>
  );
})}

                      <th className="mobile-visible"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} className={selectedCell?.rowId === p.id ? 'selected-row' : ''}>
                        <td className="arrow-column">
                          {selectedCell?.rowId === p.id && <ArrowRight size={18} />}
                        </td>

                        {["articleNo", "productService", "inPrice", "price", "unit", "inStock", "description"].map((field) => {
  
  let className = "";

if (["articleNo", "productService", "price", "unit", "inStock", "inPrice", "description"].includes(field)) {
  className = "desktop-only"; // Default for desktop

  if (["productService", "price"].includes(field)) {
    className = "mobile-visible";
  } else if (["unit", "inStock"].includes(field)) {
    className = "tablet-visible";
  }

  if (["inPrice", "description"].includes(field)) {
    className += " hide-on-ipad"; // Add for iPad
  }
}

  return (
    <td
      key={field}
      className={`${className} ${selectedCell?.rowId === p.id && selectedCell?.field === field ? 'selected-cell' : ''}`}
      onClick={() => startEditing(p.id, field, String(p[field as keyof Product]))}
    >
      <EditableCell
        value={editing.id === p.id && editing.field === field ? editing.value : String(p[field as keyof Product])}
        isEditing={editing.id === p.id && editing.field === field}
        onClick={() => startEditing(p.id, field, String(p[field as keyof Product]))}
        onChange={(e) => setEditing({ ...editing, value: e.target.value })}
        onBlur={saveChanges}
        onKeyDown={handleKeyDown}
      />
    </td>
  );
})}

                        <td className="action-cell mobile-visible">
                          <button className="action-button">
                            <MoreHorizontal size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PriceListPage;