import { findUser, createUser, findOneUser, updateUser, findUserById, findAll, deleteUser } from '../services/users.service.js'
import { compareHashedData } from '../utils/bcrypt.utils.js'
import CustomError from '../services/errors/CustomError.js'
import { ErrorsName, ErrorsMessage} from '../services/errors/enum.js'
import { generateUserErrorInfo } from '../services/errors/cause.js'
import logger from '../utils/logger.js'
import { transporter } from '../messages/nodemailer.js'


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
                } else if(user[0].role && user[0].role === 'admin') {
                    req.session.isAdmin = true
                }
                logger.info(user[0].role)
                user[0].last_connection = new Date()
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
    const { first_name, last_name, email, age, password} = req.body
    try {
    if (!first_name || !last_name || !email || !age || !password) {
        CustomError.createCustomError({
            name: ErrorsName.USER_ERROR_REGISTER,
            message: ErrorsMessage.USER_ERROR_REGISTER,
            cause: generateUserErrorInfo({first_name, last_name, email, age, password}),
        })
    } else {
            const userExists = await findUser({ email })
            if (userExists.length !== 0) {
                return res.json({message:'Ya existe un usuario con este email'})
            } else {
                const newUser = await createUser({...req.body})
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
        if(user.documents.length === 0 || !user.documents[0].identification || !user.documents[0].address || !user.documents[0].account){
            return res.json({message:'Debe cargar todos los documentos solicitados'})
        } else {
            logger.info('Tiene todos los documentos solicitados')
            const userChange = await updateUser(uid, role)
            return res.json({message:'Role actualizado con éxito', userChange})
        }
    } catch (error) {
        return error
    }
}

export async function documentUploader(req, res){
    const {uid} = req.params
    try {
        const user = await findUserById(uid)
        console.log(user);
        if(user === null) {
            return res.json({message: 'Usuario no existe en nuestra base de datos'})
        } else {
            user.documents.push({...req.body})
            console.log(user);
            user.save()
            return res.json({message:'Documento agregado con éxito', user})
        }
    } catch (error) {
        return error
    }
}

export async function getAllUsers(req, res){
    try {
        const users = await findAll()
        return res.json({message: 'Listado de todos los usuarios', users})
    } catch (error) {
        return error
    }
}

export async function deleteUsers(req, res){
    try {
        const currentDate = new Date()
        const tenMinutesAgo = new Date(currentDate.getTime() - 10 * 60 * 1000) //condicion para probar mas rapido
        const twoDaysAgo = new Date(currentDate.getTime() - 2 * 24 * 60 * 60 * 1000) //condicion pedida en la entrega
        const deleteCondition = {
            $or: [
                { last_connection: '' }, 
                { last_connection: { $lt: tenMinutesAgo} }
            ]
        }
        const users = await findAll()
        const deletedUsers = users.filter(user => user.last_connection === ' ' || new Date(user.last_connection).getTime() < tenMinutesAgo.getTime())
        const emailsToDelete = deletedUsers.map(user => user.email)
        if(emailsToDelete.length !== 0) {
            await transporter.sendMail({
                from: 'CIRA',
                to: emailsToDelete,
                subject: 'Usuario eliminado de nuestra base de datos',
                html: `<h2>Usuario eliminado por inactividad</h2>`
            })
            await deleteUser(deleteCondition)
            return res.json({message: 'Usuarios eliminados con exito', deletedUsers})
        } else {
            return res.json({message: 'No hay usuarios que cumplan las condiciones para ser eliminados'})
        }
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
        console.log(user);
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