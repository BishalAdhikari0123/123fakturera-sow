import express from 'express';
import {
  getProducts,
  getProduct,
  createNewProduct,
  updateExistingProduct,
  deleteExistingProduct
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', createNewProduct);
router.put('/:id', updateExistingProduct);
router.delete('/:id', deleteExistingProduct);

export default router;