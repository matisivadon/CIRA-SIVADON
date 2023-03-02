import {Router} from 'express'
import UserManager from '../dao/mongoManagers/users-manager.js'

const router = Router()
const userManager = new UserManager()


router.post('/registro', async (req, res) => {
    const {email, password} = req.body
    const user = await userManager.register({email, password})
    if(user.length !== 0) {
        res.redirect('/errorRegistro')
    } else {
        await userManager.createUser(req.body)
        res.redirect('/login')
    }
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body
    const user = await userManager.register({email, password})
    if(user.length !== 0) {
        for (const key in req.body) {
            req.session[key] = req.body[key]
        }
        req.session.logged = true

        if(email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            req.session.isAdmin = true
        } else {
            req.session.isAdmin = false
        }

        res.redirect('/products')
    } else {
        res.redirect('/errorLogin')
    }

})

router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if(error) {
            console.log(error)
        } else {
            res.redirect('/login')
        }
    })
})

export default router