import { findUser, createUser, findOneUser } from '../services/users.service.js'
import { compareHashedData } from '../utils/bcrypt.utils.js'
import CustomError from '../services/errors/CustomError.js'
import { ErrorsName, ErrorsMessage, ErrorsCause } from '../services/errors/enum.js'
import { generateUserErrorInfo } from '../services/errors/info.js'


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
                if (user[0].role && user[0].role === 'admin') {
                    req.session.isAdmin = true
                } else {
                    req.session.isAdmin = false
                }
               return res.json({message:'Usuario logueado', user})
            }
        }
        return res.json({message:'Usuario o contraseña incorrecta'})
    } catch (error) {
        res.status(500).json({ error })
    }
}

export async function createAUser(req, res) {
    const { first_name, last_name, email, age, password } = req.body
    // if (!first_name || !last_name || !email || !age || !password) {
        CustomError.createCustomError({
            name: ErrorsName.USER_ERROR_REGISTER,
            message: ErrorsMessage.USER_ERROR_REGISTER,
            cause: generateUserErrorInfo({first_name, last_name, email, age}),
            // code: EErrors.INVALID_TYPES_ERROR
        })
    //     res.status(400).json({ error: 'Faltan datos' })
    // } else {
        // try {
        //     const userExists = await findUser({ email })
        //     if (userExists.length !== 0) {
        //         return res.json({message:'Ya existe un usuario con este email'})
        //     } else {
        //         let role = 'user';
        //         if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        //             role = 'admin';
        //         }
        //         const newUser = await createUser({...req.body, role});
        //         console.log(role);
        //         return res.json({message:'Usuario registrado con éxito', newUser})
        //     }
        // } catch (error) {
        //     res.status(500).json({ error })
        // }
    
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


//views router
export async function viewsUsers(req, res) {
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
                if (user[0].role && user[0].role === 'admin') {
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