import express from 'express'
import { addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered } from '../controllers/orderController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').post(verifyToken, addOrderItems)
router.route('/:id').get(verifyToken, getOrderById)
router.route("/:id/pay").put(verifyToken, updateOrderToPaid)
router.route("/:id/deliver").put(verifyToken, updateOrderToDelivered)

export default router