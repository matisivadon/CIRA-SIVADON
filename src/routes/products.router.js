import {Router} from "express";
import {ProductManager} from '../index.js'

const router = Router()

const newProduct = new ProductManager()

router.get('/', async (req, res) => {
    const { limit } = req.query
    const products = await newProduct.getProducts(limit || 'max')
    res.json({ products })
})

router.get('/:pid', async (req, res) => {
    const { pid } = req.params
    const product = await newProduct.getProductById(pid)
    res.json({ product })
})

router.post('/', async (req, res) => {
    const {title, description, code, price, status, stock, category, image, size} = req.body
    const product = await newProduct.addProducts(title, description, code, price, status, stock, category, image, size)
    res.json({message:'producto agregado con éxito',product})
    
})

router.put('/:pid', async (req, res) => {
    const {pid} = req.params
    const change = req.body
    const product = await newProduct.updateProduct(pid,change)
    res.json({message:'producto actualizado con éxito',product})
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    const product = await newProduct.deleteProduct(id)
    res.json({message:'producto eliminado con éxito',product})
})

export default router