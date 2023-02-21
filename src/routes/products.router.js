import {Router} from "express";
// import ProductManager from '../dao/fileManagers/product-manager.js'
import ProductManager from '../dao/mongoManagers/product-manager.js'

const router = Router()

const productManager = new ProductManager()

router.get('/', async (req, res) => {
    const {limit= 10, page= 1, category, status, price} = req.query
    const products = await productManager.getProducts(limit, page, category, status, price)
        res.json({
            status: !products.docs? 'Error' : 'Success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.prevPage? true : false,
            hasNexPage: products.nextPage? true : false,
            prevLink: products.hasPrevPage? `localhost:8080/api/products?page=${products.prevPage}` : null,
            nextLink: products.hasNextPage?`localhost:8080/api/products?page=${products.nextPage}` : null,
        })
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

router.delete('/:pid', async (req, res) => {
    const {pid} = req.params
    const product = await productManager.deleteProduct(pid)
    res.json({message:'producto eliminado con éxito',product})
})

export default router