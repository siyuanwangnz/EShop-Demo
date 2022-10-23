import express from 'express'
import { fetchProducts, fetchProductById } from '../controllers/productController.js'

const router = express.Router()

router.route('/').get(fetchProducts)
router.route('/:id').get(fetchProductById)

export default router