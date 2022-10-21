import express from "express"
import connectDB from './config/db.js'
import dotenv from "dotenv"
import colors from 'colors'

import productRoutes from './routes/productRoutes.js'

dotenv.config({ path: "../.env" })

connectDB()

const app = express()

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/products', productRoutes);

const PORT = process.env.PORT

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold)
)
