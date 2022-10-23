import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

export const verifyToken = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // get token from header authorization
            token = req.headers.authorization.split(' ')[1]

            // verify token with key
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // find user without password by id and give it to request
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})
