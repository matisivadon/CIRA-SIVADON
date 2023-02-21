import { Router } from "express"
import { renderSync } from "node-sass"
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

router.post('/:cid/product/:_id', async (req, res) => {
    const { cid, _id } = req.params
    const addProduct = await cartManager.addProductToCart(cid, _id)
    res.json({message:'Producto agregado con éxito', carrito: addProduct})
})

router.put('/:cid', async (req, res) => {
    const {cid} = req.params
    const {_id, infoProduct} = req.body
    const cart = await cartManager.updateCart(cid, _id, infoProduct)
    res.json({message:'Carrito actualizado con éxito', carrito: cart})
})

router.put('/:cid/product/:_id', async (req, res) => {
    const {cid, _id} = req.params
    const {quantity} = req.body
    const cart = await cartManager.updateQuantity(cid, _id, quantity)
    res.json({message:'Carrito actualizado con éxito', carrito: cart})
})

router.delete('/:cid/product/:pid', async (req, res) => {
    const {cid, pid} = req.params
    const cart = await cartManager.deleteProductFromCart(cid, pid)
    res.json({message: 'Producto eliminado con exito', carrito: cart})
})

router.delete('/:cid', async (req, res) => {
    const {cid} = req.params
    const cart = await cartManager.deleteCart(cid)
    res.json({message:'Carrito eliminado con exito', carrito: cart})
})

export default router