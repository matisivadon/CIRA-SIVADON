import { Router } from "express"
import { addACart, getOneCart, addAProductToCart, updateACart, updateQuantityFromCart, deleteAProductFromCart, deleteACart } from "../controllers/cart.controller.js"


const router = Router()

router.post('/', addACart)

router.get('/:cid', getOneCart)

router.post('/:cid/product/:pid', addAProductToCart)

router.put('/:cid', updateACart)

router.put('/:cid/product/:_id', updateQuantityFromCart)

router.delete('/:cid/product/:pid', deleteAProductFromCart)

router.delete('/:cid', deleteACart)

export default router