import axios from 'axios';
import { Product } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTerms = async (language: string) => {
  const response = await api.get(`/terms?language=${language}`);
  return response.data;
};

export const getPriceList = async () => {
  const response = await api.get<Product[]>('/products');
  return response.data;
};

export const updateProduct = async (id: number, productData: Partial<Product>) => {
  const response = await api.put<Product>(`/products/${id}`, productData);
  return response.data;
};

export const createProduct = async (productData: Omit<Product, 'id'>) => {
  const response = await api.post<Product>('/products', productData);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

export const getTranslations = async (language: string) => {
  const response = await api.get(`/translations?language=${language}`);
  return response.data;
};

export default api;
