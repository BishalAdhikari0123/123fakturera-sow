import Product from '../models/Product.js';

export const getAllProducts = async () => {
  try {
    return await Product.findAll({
      order: [['id', 'DESC']],
    });
  } catch (error) {
    throw new Error('Error fetching products: ' + error.message);
  }
};

export const getProductById = async (id) => {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    throw new Error('Error fetching product: ' + error.message);
  }
};

export const createProduct = async (productData) => {
  try {
    return await Product.create(productData);
  } catch (error) {
    throw new Error('Error creating product: ' + error.message);
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return await product.update(productData);
  } catch (error) {
    throw new Error('Error updating product: ' + error.message);
  }
};

export const deleteProduct = async (id) => {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }
    await product.destroy();
  } catch (error) {
    throw new Error('Error deleting product: ' + error.message);
  }
};