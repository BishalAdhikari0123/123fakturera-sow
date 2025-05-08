import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Search, Plus, Printer, ToggleRight, MoreHorizontal } from 'lucide-react';
import { getPriceList, updateProduct } from '../utils/api';

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
  />
) : (
  <div onClick={onClick}>{value}</div>
);

const PriceListPage = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<{ id: number | null, field: string | null, value: string }>({ id: null, field: null, value: '' });

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header showSidebar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-x-auto">
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            {/* Action Bar */}
            <div className="mb-6 flex flex-col md:flex-row gap-10 justify-between">
              <div className="flex-8 space-y-3">
                {[t('pricelist.search.article'), t('pricelist.search.product')].map((placeholder, i) => (
                  <div key={i} className="relative">
                    <input type="text" placeholder={placeholder} className="input-field pl-10 w-full" />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  </div>
                ))}
              </div>
              <div className="flex md:flex-row justify-between md:justify-start gap-2">
                {[{
                  icon: <Plus size={18} />, action: addNewProduct, text: t('pricelist.newProduct')
                }, {
                  icon: <Printer size={18} />, action: () => {}, text: t('pricelist.printList')
                }, {
                  icon: <ToggleRight size={18} />, action: () => {}, text: t('pricelist.advancedMode')
                }].map(({ icon, action, text }, i) => (
                  <button
                    key={i}
                    onClick={action}
                    className="btn btn-primary flex items-center gap-2 h-8 text-sm px-3 rounded-lg shadow"
                  >
                    {icon}<span className="hidden sm:inline">{text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-8">{error}</div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-x-auto max-h-[70vh] overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      {["articleNo", "product", "inPrice", "price", "unit", "inStock", "description"]
                        .map(key => (
                          <th key={key} className="py-3 px-4 text-left font-medium text-gray-500">
                            {t(`pricelist.${key}`)}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                  {products.map((p, i) => (
  <tr key={p.id} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
    {["articleNo", "productService", "inPrice", "price", "unit", "inStock", "description"].map((field) => (
      <td
        key={field}
        className="py-3 px-4 border-b"
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
    ))}
    <td className="py-3 px-4 border-b text-center">
      <button className="text-gray-500 hover:text-gray-700">
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