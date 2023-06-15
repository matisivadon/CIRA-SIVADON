import { findUser, createUser, findOneUser, updateUser, findUserById } from '../services/users.service.js'
import { compareHashedData } from '../utils/bcrypt.utils.js'
import CustomError from '../services/errors/CustomError.js'
import { ErrorsName, ErrorsMessage} from '../services/errors/enum.js'
import { generateUserErrorInfo } from '../services/errors/cause.js'
import logger from '../utils/logger.js'


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
                req.session.isPremium = true
                req.session.isAdmin = false

                if(user[0].role && user[0].role === 'user') {
                    req.session.isPremium = false
                }

                if (user[0].role && user[0].role === 'admin') {
                    req.session.isAdmin = true
                }

                logger.info(user[0].role)
                user[0].last_connection = new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" })
                user[0].save()
               return res.json({message:'Usuario logueado', user})
            }
        }
        return res.json({message:'Usuario o contraseña incorrecta'})
    } catch (error) {
        logger.fatal(error)
    }
}

export async function createAUser(req, res, next) {
    const { first_name, last_name, email, age, password, role } = req.body
    try {
    if (!first_name || !last_name || !email || !age || !password || !role) {
        CustomError.createCustomError({
            name: ErrorsName.USER_ERROR_REGISTER,
            message: ErrorsMessage.USER_ERROR_REGISTER,
            cause: generateUserErrorInfo({first_name, last_name, email, age, password, role}),
        })
    } else {
            const userExists = await findUser({ email })
            if (userExists.length !== 0) {
                return res.json({message:'Ya existe un usuario con este email'})
            } else {
                const newUser = await createUser({...req.body});
                logger.info(newUser)
                return res.json({message:'Usuario registrado con éxito', newUser})
            }
        }
     } catch (error) {
            next(error)
        }
}

export async function changeUserRole(req, res) {
    const {uid} = req.params
    const role = req.body
    try {
        const user = await findUserById(uid)
        const mandatoryDocuments = ['identificacion', 'address', 'account']
        if(mandatoryDocuments.length !== user.documents.length) {
            res.json({message:'Debe cargar todos los documentos solicitados'})
        } else {
            const userChange = await updateUser(uid, role)
            res.json({message:'Role actualizado con éxito', userChange})
        }
    } catch (error) {
        return error
    }
}

export async function documentUploader(req, res){
    const {uid} = req.params
    const {name, reference} = req.files
    try {
        const user = await findUserById(uid)
        console.log(req.documents);
        user.documents.push({...req.body})
        user.save()
        return res.json({message:'Documento agregado con éxito', user})
    } catch (error) {
        return error
    }
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