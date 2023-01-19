import { Router } from "express"
import CartManager from "../cart-manager.js"
import {ProductManager} from "../index.js"

const newCart = new CartManager
const newProduct = new ProductManager

const router = Router()

router.post('/', async (req, res) => {
    const cart = await newCart.addCart()
    res.json({ cart })
})

router.get('/:cid', async (req, res) => {
    const { cid } = req.params
    const cart = await newCart.getCartById(cid)
    res.json({ cart })
})

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const cart = await newCart.getCartById(cid)
    const product = await newProduct.getProductById(pid)
    const addProduct = await newCart.addProductToCart(cid, pid, 1)
    res.json({cart, product, addProduct})
})



export default router