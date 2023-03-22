import { Router } from 'express'
import UserManager from '../dao/mongoManagers/users-manager.js'
import { hashData, compareHashedData } from '../utils.js'
import passport from 'passport'


const router = Router()
const userManager = new UserManager()



router.post('/registro', async (req, res) => {
    const { email, password } = req.body
    const user = await userManager.findUser({ email, password })
    if (user.length !== 0) {
       res.redirect('/errorRegistro')
    } else {
        const hashNewPassword = await hashData(password)
        const newUser = { ...req.body, password: hashNewPassword }
        await userManager.createUser(newUser)
        res.redirect('/login')
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await userManager.findUser({email})
    if (user.length !== 0) {
        const isValidPassword = await compareHashedData(password, user[0].password)
        if (isValidPassword) {
            for (const key in req.body) {
                req.session[key] = req.body[key]
            }
            req.session.logged = true
            if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
                req.session.isAdmin = true
            } else {
                req.session.isAdmin = false
            }
            return res.redirect('/products')
        }
    } 
        return res.redirect('/errorLogin')
    
})

router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log(error)
        } else {
            res.redirect('/login')
        }
    })
})


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