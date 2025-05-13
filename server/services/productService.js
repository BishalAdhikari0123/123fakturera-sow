import Product from '../models/Product.js';
import { Op } from 'sequelize';

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
    const { productService, price, inStock } = productData;

    // Check if a product with the same productService and price already exists
    const existingProduct = await Product.findOne({
      where: {
        productService,
        price
      }
    });

    if (existingProduct) {
      // Update inStock by adding new stock to existing stock
      existingProduct.inStock = parseInt(existingProduct.inStock) + parseInt(inStock);
      await existingProduct.save();

      return {
        message: 'Product already exists. Stock updated.',
        product: existingProduct
      };
    }

    // If not exists, create a new product
    const newProduct = await Product.create(productData);
    return {
      message: 'New product created.',
      product: newProduct
    };

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