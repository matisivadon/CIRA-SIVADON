import {usersModel} from '../../mongoDB/models/users.model.js'

export default class UsersMongo {

    async findUser(email, password) {
        try {
            const user = await usersModel.find(email, password)
            return user
        } catch (error) {
            console.log(error)
        }
    }

    //retorna un usuario 
    async findUserById(_id) {
        try {
            const user = await usersModel.findById(_id)
            return user
        } catch (error) {
            console.log(error)
        }
    }

    //retorna un usuario con el detalle del carrito
    async findOneUser(_id) {
        try {
            const user = await usersModel.findById(_id).populate('cart').lean()
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async findAllUsers(){
        try {
            const users = await usersModel.find()
            return users
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

    async updateUser(uid, objUser) {
        try {
            const user = await usersModel.findByIdAndUpdate({_id:uid}, {$set:objUser}, {new:true})
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async deleteUser(condition){
        try {
            const users = await usersModel.deleteMany(condition)
            return users
        } catch (error) {
            console.log(error);
        }
    }

}