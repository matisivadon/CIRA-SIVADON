import {Router} from "express";
// import ProductManager from '../dao/fileManagers/product-manager.js'
import ProductManager from '../dao/mongoManagers/product-manager.js'

const router = Router()

const productManager = new ProductManager()

router.get('/', async (req, res) => {
    const { limit } = req.query
    const products = await productManager.getProducts(limit || 'max')
    res.json({ products })
})

router.get('/:pid', async (req, res) => {
    const { pid } = req.params
    const product = await productManager.getProductById(pid)
    res.json({ product })
})

router.post('/', async (req, res) => {
    const {title, description, code, price, status, stock, category, image, size} = req.body
    if(!title || !description || !code || !price || !status || !stock || !category || !image || !size) {
        res.json({message:'Debe completar todos los datos'})
    } else {
        const product = await productManager.addProducts({title, description, code, price, status, stock, category, image, size})
        res.json({message:'producto agregado con éxito',product: product})
    }

    
})

router.put('/:pid', async (req, res) => {
    const {pid} = req.params
    const change = req.body
    const product = await productManager.updateProduct(pid,change)
    res.json({message:'producto actualizado con éxito',product})
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    const product = await productManager.deleteProduct(id)
    res.json({message:'producto eliminado con éxito',product})
})

export default router