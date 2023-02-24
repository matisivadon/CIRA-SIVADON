import { Router } from "express"
import ProductManager from "../dao/mongoManagers/product-manager.js"
import CartManager from "../dao/mongoManagers/cart-manager.js"

const productManager = new ProductManager()
const cartManager = new CartManager()

const router = Router()

router.get('/', async(req, res) => {
    res.render('index', index)
})

router.get('/products', async (req, res) => {
    const {limit, page, category, status, price} = req.query
    const products = await productManager.getProducts(limit, page, category, status, price)
    console.log(products);
    res.render('products',{
        products,
        style: 'style.css'
    })
})

router.get('/carts/:cid', async(req, res) => {
    const {cid} = req.params
    const cart = await cartManager.getCartById(cid)
    res.render('carts', {
        cart,
        style: 'style.css'
    })
})

export default router