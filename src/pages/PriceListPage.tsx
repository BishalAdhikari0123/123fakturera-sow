import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { 
  Search, Plus, Printer, ToggleRight, Trash2, MoreHorizontal
} from 'lucide-react';
import { getPriceList, updateProduct, createProduct } from '../utils/api';

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

const PriceListPage = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getPriceList();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
        setLoading(false);
        
        // Generate dummy data if API fails
        const dummyProducts = [];
        for (let i = 1; i <= 20; i++) {
          dummyProducts.push({
            id: i,
            articleNo: `123456${i.toString().padStart(4, '0')}`,
            productService: `Product ${i} - Sample description text with sufficient length`,
            inPrice: ((i * 1000) + 500).toString(),
            price: ((i * 1500) + 800).toString(),
            unit: ['pieces', 'hours', 'kilometers', 'meters', 'kilograms'][i % 5],
            inStock: ((i * 100) + 50).toString(),
            description: `This is a detailed description for product ${i} with exactly fifty chars!`
          });
        }
        setProducts(dummyProducts);
      }
    };

    fetchProducts();
  }, []);

  const startEditing = (id: number, field: string, value: string) => {
    setEditingId(id);
    setEditingField(field);
    setEditingValue(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(e.target.value);
  };

  const saveChanges = async () => {
    if (editingId === null || editingField === null) return;
    
    try {
      const productToUpdate = products.find(p => p.id === editingId);
      if (!productToUpdate) return;
      
      const updatedProduct = {
        ...productToUpdate,
        [editingField]: editingValue
      };
      
      // In a real implementation, this would call the API
      await updateProduct(editingId, updatedProduct);
      
      // Update local state
      setProducts(products.map(p => 
        p.id === editingId ? { ...p, [editingField]: editingValue } : p
      ));
      
      // Reset editing state
      setEditingId(null);
      setEditingField(null);
      setEditingValue('');
    } catch (err) {
      console.error('Error updating product:', err);
      // Simply update local state for demo purposes
      setProducts(products.map(p => 
        p.id === editingId ? { ...p, [editingField]: editingValue } : p
      ));
      setEditingId(null);
      setEditingField(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveChanges();
    } else if (e.key === 'Escape') {
      setEditingId(null);
      setEditingField(null);
    }
  };

  const handleBlur = () => {
    saveChanges();
  };

  const addNewProduct = async () => {
    try {
      const newProduct = {
        articleNo: `New-${Date.now().toString().slice(-8)}`,
        productService: 'New product',
        inPrice: '0',
        price: '0',
        unit: 'pieces',
        inStock: '0',
        description: 'Product description'
      };
      
      // In a real implementation, this would call the API
      // const savedProduct = await createProduct(newProduct);
      
      // For demo purposes, we'll just add it to local state with a fake ID
      const fakeId = Math.max(...products.map(p => p.id), 0) + 1;
      const productWithId = { ...newProduct, id: fakeId };
      
      setProducts([productWithId, ...products]);
      
      // Start editing the new product name
      setTimeout(() => {
        startEditing(fakeId, 'productService', 'New product');
      }, 100);
    } catch (err) {
      console.error('Error creating product:', err);
    }
  };

  // Determine which fields to show based on screen size
  // This will be handled by responsive CSS classes

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header showSidebar={true} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-x-auto">
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            {/* Action Bar */}
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className="flex-1 space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t('pricelist.search.article')}
                    className="input-field pl-10 w-full"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t('pricelist.search.product')}
                    className="input-field pl-10 w-full"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>
              
              <div className="flex md:flex-col justify-between md:justify-start gap-2">
                <button 
                  onClick={addNewProduct}
                  className="btn btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Plus size={18} />
                  <span className="hidden sm:inline">{t('pricelist.newProduct')}</span>
                </button>
                <button className="btn btn-outline flex items-center justify-center gap-2 whitespace-nowrap">
                  <Printer size={18} />
                  <span className="hidden sm:inline">{t('pricelist.printList')}</span>
                </button>
                <button className="btn btn-outline flex items-center justify-center gap-2 whitespace-nowrap">
                  <ToggleRight size={18} />
                  <span className="hidden sm:inline">{t('pricelist.advancedMode')}</span>
                </button>
              </div>
            </div>
            
            {/* Product Table */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-8">
                <p>{error}</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-x-auto">
                {/* Desktop View */}
                <table className="hidden md:table w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="py-3 px-4 text-left font-medium text-gray-500">{t('pricelist.articleNo')}</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-500">{t('pricelist.product')}</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-500">{t('pricelist.inPrice')}</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-500">{t('pricelist.price')}</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-500">{t('pricelist.unit')}</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-500">{t('pricelist.inStock')}</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-500">{t('pricelist.description')}</th>
                      <th className="py-3 px-4 text-center font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr 
                        key={product.id} 
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        <td 
                          className="py-3 px-4 border-b border-gray-200"
                          onClick={() => startEditing(product.id, 'articleNo', product.articleNo)}
                        >
                          {editingId === product.id && editingField === 'articleNo' ? (
                            <input
                              type="text"
                              value={editingValue}
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                              onKeyDown={handleKeyDown}
                              className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-400"
                              autoFocus
                            />
                          ) : (
                            product.articleNo
                          )}
                        </td>
                        <td 
                          className="py-3 px-4 border-b border-gray-200"
                          onClick={() => startEditing(product.id, 'productService', product.productService)}
                        >
                          {editingId === product.id && editingField === 'productService' ? (
                            <input
                              type="text"
                              value={editingValue}
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                              onKeyDown={handleKeyDown}
                              className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-400"
                              autoFocus
                            />
                          ) : (
                            product.productService
                          )}
                        </td>
                        <td 
                          className="py-3 px-4 border-b border-gray-200"
                          onClick={() => startEditing(product.id, 'inPrice', product.inPrice)}
                        >
                          {editingId === product.id && editingField === 'inPrice' ? (
                            <input
                              type="text"
                              value={editingValue}
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                              onKeyDown={handleKeyDown}
                              className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-400"
                              autoFocus
                            />
                          ) : (
                            product.inPrice
                          )}
                        </td>
                        <td 
                          className="py-3 px-4 border-b border-gray-200"
                          onClick={() => startEditing(product.id, 'price', product.price)}
                        >
                          {editingId === product.id && editingField === 'price' ? (
                            <input
                              type="text"
                              value={editingValue}
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                              onKeyDown={handleKeyDown}
                              className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-400"
                              autoFocus
                            />
                          ) : (
                            product.price
                          )}
                        </td>
                        <td 
                          className="py-3 px-4 border-b border-gray-200"
                          onClick={() => startEditing(product.id, 'unit', product.unit)}
                        >
                          {editingId === product.id && editingField === 'unit' ? (
                            <input
                              type="text"
                              value={editingValue}
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                              onKeyDown={handleKeyDown}
                              className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-400"
                              autoFocus
                            />
                          ) : (
                            product.unit
                          )}
                        </td>
                        <td 
                          className="py-3 px-4 border-b border-gray-200"
                          onClick={() => startEditing(product.id, 'inStock', product.inStock)}
                        >
                          {editingId === product.id && editingField === 'inStock' ? (
                            <input
                              type="text"
                              value={editingValue}
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                              onKeyDown={handleKeyDown}
                              className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-400"
                              autoFocus
                            />
                          ) : (
                            product.inStock
                          )}
                        </td>
                        <td 
                          className="py-3 px-4 border-b border-gray-200"
                          onClick={() => startEditing(product.id, 'description', product.description)}
                        >
                          {editingId === product.id && editingField === 'description' ? (
                            <input
                              type="text"
                              value={editingValue}
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                              onKeyDown={handleKeyDown}
                              className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-400"
                              autoFocus
                            />
                          ) : (
                            product.description
                          )}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-200 text-center">
                          <button className="text-gray-500 hover:text-gray-700">
                            <MoreHorizontal size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {/* Tablet View */}
                <div className="md:hidden lg:hidden">
                  {products.map((product, index) => (
                    <div 
                      key={product.id}
                      className={`p-4 border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div 
                          className="font-medium"
                          onClick={() => startEditing(product.id, 'articleNo', product.articleNo)}
                        >
                          {editingId === product.id && editingField === 'articleNo' ? (
                            <input
                              type="text"
                              value={editingValue}
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                              onKeyDown={handleKeyDown}
                              className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-400"
                              autoFocus
                            />
                          ) : (
                            product.articleNo
                          )}
                        </div>
                        <div className="flex space-x-2">
                          {index === 2 && <div className="text-primary-500">→</div>}
                          <button className="text-gray-500 hover:text-gray-700">
                            <MoreHorizontal size={18} />
                          </button>
                        </div>
                      </div>
                      
                      <div 
                        className="mb-2"
                        onClick={() => startEditing(product.id, 'productService', product.productService)}
                      >
                        {editingId === product.id && editingField === 'productService' ? (
                          <input
                            type="text"
                            value={editingValue}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-400"
                            autoFocus
                          />
                        ) : (
                          product.productService
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        <div>
                          <div className="text-xs text-gray-500">{t('pricelist.price')}</div>
                          <div 
                            onClick={() => startEditing(product.id, 'price', product.price)}
                          >
                            {editingId === product.id && editingField === 'price' ? (
                              <input
                                type="text"
                                value={editingValue}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                onKeyDown={handleKeyDown}
                                className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-400"
                                autoFocus
                              />
                            ) : (
                              product.price
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-gray-500">{t('pricelist.inStock')}</div>
                          <div 
                            onClick={() => startEditing(product.id, 'inStock', product.inStock)}
                          >
                            {editingId === product.id && editingField === 'inStock' ? (
                              <input
                                type="text"
                                value={editingValue}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                onKeyDown={handleKeyDown}
                                className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-400"
                                autoFocus
                              />
                            ) : (
                              product.inStock
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-gray-500">{t('pricelist.unit')}</div>
                          <div 
                            onClick={() => startEditing(product.id, 'unit', product.unit)}
                          >
                            {editingId === product.id && editingField === 'unit' ? (
                              <input
                                type="text"
                                value={editingValue}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                onKeyDown={handleKeyDown}
                                className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-400"
                                autoFocus
                              />
                            ) : (
                              product.unit
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PriceListPage;