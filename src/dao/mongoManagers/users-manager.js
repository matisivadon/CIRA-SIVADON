import {usersModel} from '../models/users.model.js'

export default class UserManager {

    async findUser(email, password) {
        const user = await usersModel.find(email, password)
        return user
    }

    async findUserById(_id) {
        const user = await usersModel.findById(_id)
        return user
    }

    async findOneUser(email) {
        const user = await usersModel.findOne(email)
        return user
    }

    async createUser(infoUser) {
        const createUser = await usersModel.create(infoUser)
        return createUser
    }
}