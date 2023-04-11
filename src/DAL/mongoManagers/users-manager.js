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
            const user = await usersModel.findById(_id)
            // .populate('cart').lean()
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async findOneUser(_id) {
        try {
            const user = await usersModel.findById(_id).populate('cart').lean()
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async createUser(user) {
        try {
            const newUser = await usersModel.create(user)
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