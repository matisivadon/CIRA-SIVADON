import {usersModel} from '../models/users.model.js'


export default class UserManager {

    async findUser(email, password) {
        try {
            const user = await usersModel.find(email, password)
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async findUserById(_id) {
        try {
            const user = await usersModel.findOne({_id}).populate('cart').lean() //modificado
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async findOneUser(email) {
        try {
            const user = await usersModel.findOne(email)
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async createUser(infoUser) {
        try {
            const newUser = await usersModel.create(infoUser)
            return newUser
        } catch (error) {
            console.log(error)
        }
    }

    async updateUser(_id, objUser) {
        try {
            const user = await usersModel.updateOne({_id}, {$set:objUser}, {new:true})
            return user
        } catch (error) {
            console.log(error)
        }
    }        
}