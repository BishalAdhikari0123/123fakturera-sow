import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../services/productService.js';

export const getProducts = async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const createNewProduct = async (req, res, next) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateExistingProduct = async (req, res, next) => {
  try {
    const product = await updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteExistingProduct = async (req, res, next) => {
  try {
    await deleteProduct(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};