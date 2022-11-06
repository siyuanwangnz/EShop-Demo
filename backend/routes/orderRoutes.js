import express from 'express'
import { addOrderItems } from '../controllers/orderController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').post(verifyToken, addOrderItems)

export default router