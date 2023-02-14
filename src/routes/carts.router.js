import { Router } from "express"
// import CartManager from "../dao/fileManagers/cart-manager.js"
import CartManager from "../dao/mongoManagers/cart-manager.js"

const cartManager = new CartManager

const router = Router()

router.post('/', async (req, res) => {
    const cart = await cartManager.addCart()
    res.json({message:'Carrito creado con éxito', cart})
})

router.get('/:cid', async (req, res) => {
    const { cid } = req.params
    const cart = await cartManager.getCartById(cid)
    res.json({ cart })
})

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const {quantity} = req.body
    const addProduct = await cartManager.addProductToCart(cid, pid, quantity)
    res.json({message:'Producto agregado con éxito', carrito: addProduct})
})

export default router