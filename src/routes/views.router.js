import { Router } from "express"
import { getAllProducts } from "../controllers/products.controller.js"
import { getACartById } from "../controllers/cart.controller.js"
import { viewsUsers, createOneUser, logOut } from "../controllers/users.controller.js"
import {auth, isLogged} from "../middlewares/auth.middlewares.js"
import passport from 'passport'


const router = Router()

router.get('/', async(req, res) => {
    res.render('index', index)
})

router.post('/login', viewsUsers)

router.post('/registro', createOneUser)

router.get('/logout', logOut)

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


// /LOGIN Y REGISTRO CON GITHUB

router.get('/registroGithub', passport.authenticate('github', {scope:['user:email']}))
router.get('/github', passport.authenticate('github', {failureRedirect:'/errorLogin'}), async (req, res) => {
    req.session.email = req.user.email
    req.session.logged = true
    res.redirect('/products')
})

// LOGIN Y REGISTRO CON GOOGLE

router.get('/registroGoogle', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google', passport.authenticate('google', {failureRedirect:'/errorLogin'}), async (req, res) => {
    req.session.email = req.user.email
    req.session.logged = true
    res.redirect('/products')
})

export default router