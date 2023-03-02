import { Router } from "express"
import ProductManager from "../dao/mongoManagers/product-manager.js"
import CartManager from "../dao/mongoManagers/cart-manager.js"
import {auth, isLogged} from "../middlewares/auth.middlewares.js"

const productManager = new ProductManager()
const cartManager = new CartManager()

const router = Router()

router.get('/', async(req, res) => {
    res.render('index', index)
})

router.get('/products', auth, async (req, res) => {
    const {limit=11, page=1, category, status, price} = req.query
    const products = await productManager.getProducts(limit, page, category, status, price)
    res.render('products',{
        email: req.session.email,
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

router.get('/registro', isLogged, (req, res) => {
    res.render('registro')
})

router.get('/errorRegistro', (req, res) => {
    res.render('errorRegistro')
})

router.get('/login', isLogged, (req, res) => {
    res.render('login')
})

router.get('/errorLogin', (req, res) => {
    res.render('errorLogin')
})

export default router