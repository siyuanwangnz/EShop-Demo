import express from 'express'
import { authUser, getUserProfile } from '../controllers/userController.js'
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router()

router.post('/login', authUser)
router.route('/profile').get(verifyToken, getUserProfile)

export default router