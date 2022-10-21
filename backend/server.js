import express from "express"
import products from "./data/products.js"
import connectDB from './config/db.js'
import dotenv from "dotenv"

dotenv.config({ path: "../.env" })

connectDB()

const app = express()

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.get('/api/products', (req, res) => {
    res.json(products);
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id)
    res.json(product);
})

const PORT = process.env.PORT

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
)
