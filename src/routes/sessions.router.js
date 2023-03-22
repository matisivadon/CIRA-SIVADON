import {Router} from 'express'
import { usersModel } from '../dao/models/users.model.js'
import { cartsModel } from '../dao/models/carts.model.js'
import UserManager from '../dao/mongoManagers/users-manager.js'

const router = Router()
const userManager = new UserManager()

router.post('/:idUser/cart/:_id', async (req, res) => {
    const {idUser, _id} = req.params
    try {
        const cart = await cartsModel.findById(_id)
        if(!cart) return res.json({message:'Carrito no existe'})
        const user = await usersModel.findById(idUser)
        if(!user) return res.json({message:'Usuario no existe'})
        const cartExists = user.cart.find(c => c._id == _id)
        if(cartExists) return res.json({message:'Este usuario ya tiene un carrito agregado'})
        user.cart.push({_id})
        user.save()
        return res.json({message:'Carrito agregado con exito', user})
    } catch (error) {
        console.log(error);
    }
})

router.get('/current/:idUser', async (req, res) => {
    const {idUser} = req.params
    try {
        const user = await userManager.findUserById(idUser)
        return res.json({user})
    } catch (error) {
        console.log(error);
    }
})



export default router