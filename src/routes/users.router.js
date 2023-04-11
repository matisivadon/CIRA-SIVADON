import { Router } from 'express'
import {findAllUsers, createOneUser, logOut} from '../controllers/users.controller.js'
import passport from 'passport'


const router = Router()

router.post('/registro', createOneUser)
router.post('/login', findAllUsers)
router.get('/logout', logOut)


//LOGIN Y REGISTRO CON GITHUB

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