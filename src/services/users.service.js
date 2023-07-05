import UsersMongo from "../persistencia/DAOs/usersDao/usersMongo.js"
import {usersDao} from '../persistencia/repositories/index.js'
import { hashData } from "../utils/bcrypt.utils.js"

const userManager = new UsersMongo()

export async function findUser(email, password) {
    try {
        const user = await userManager.findUser(email, password)
        return user
    } catch (error) {
        return error
    }
}

//Encuentra el usuario por Id
export async function findUserById(_id) {
    try {
        const user = await userManager.findUserById(_id)
        return user
    } catch (error) {
        return error
    }
}

//Retorna un usuario con el detalle de su carrito
export async function findOneUser(_id) {
    try {
        const user = await usersDao.findOneUser(_id)
        return user
    } catch (error) {
        return error
    }
}

export async function findAll(){
    try {
        const users = await usersDao.findAllUsers()
        return users
    } catch (error) {
        return error
    }
}

export async function createUser(user) {
    try {
        const hashPassword = await hashData(user.password)
        const newUser = await usersDao.createUser({ ...user, password: hashPassword })
        return newUser
    } catch (error) {
        return error
    }
}

export async function updateUser(uid, objUser) {
    try {
        const user = await userManager.updateUser(uid, objUser)
        return user
    } catch (error) {
        return error
    }
}

export async function deleteUser(condition){
    try {
        const user = await userManager.deleteUser(condition)
        return user
    } catch (error) {
        return error
    }
}