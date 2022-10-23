import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

// @desc Fetch all products
// @route GET /api/products
// @access Public
export const fetchProducts = asyncHandler(async (req, res) => {
    // throw error for testing
    // res.status(404)
    // throw new Error('No Authorized')

    const products = await Product.find({})
    res.json(products)
})

// @desc Fetch single products
// @route GET /api/products/:id
// @access Public
export const fetchProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})