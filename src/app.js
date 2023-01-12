import express from 'express'
import { ProductManager } from './index.js'

const newProduct = new ProductManager()

const app = express()

const PORT = 8080

app.get('/products', async (req, res) => {
    const { limit } = req.query
    const products = await newProduct.getProducts(limit || 'max')
    res.json({ products })
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params
    const product = await newProduct.getProductById(id)
    res.json({ product })
})

app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`)
})