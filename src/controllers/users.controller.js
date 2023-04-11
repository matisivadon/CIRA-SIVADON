import { findUser, createUser, findUserById, findOneUser } from '../services/users.service.js'
import { compareHashedData } from '../utils/bcrypt.utils.js'


//users router
export async function findAllUsers(req, res) {
    const { email, password } = req.body
    try {
        const user = await findUser({ email })
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
    } catch (error) {
        res.status(500).json({ error })
    }
}

export async function createOneUser(req, res) {
    const { first_name, last_name, email, age, password } = req.body
    if (!first_name || !last_name || !email || !age || !password) {
        res.status(400).json({ error: 'Faltan datos' })
    }
    try {
        const user = await findUser({ email })
        if (user.length !== 0) {
            res.redirect('/errorRegistro')
        } else {
            const newUser = await createUser(req.body)
            res.redirect('/login')
        }

    } catch (error) {
        res.status(500).json({ error })
    }
}

export async function logOut(req, res) {
    req.session.destroy((error) => {
        if (error) {
            console.log(error)
        } else {
            res.redirect('/login')
        }
    })
}


//sessions router
export async function findOneUserById(req, res) {
    const {idUser} = req.params
    try {
        const user = await findOneUser(idUser)
        return res.json({user})
    } catch (error) {
        return error
    }
}