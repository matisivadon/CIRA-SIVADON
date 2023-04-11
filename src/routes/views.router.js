import { Router } from "express"
import { getAllProducts } from "../controllers/products.controller.js"
import { getACartById } from "../controllers/cart.controller.js"
import {auth, isLogged} from "../middlewares/auth.middlewares.js"



const router = Router()

router.get('/', async(req, res) => {
    res.render('index', index)
})

router.get('/products', auth, getAllProducts)

router.get('/carts/:cid', getACartById)


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