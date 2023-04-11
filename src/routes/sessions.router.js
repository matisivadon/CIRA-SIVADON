import {Router} from 'express'
import { findOneUserById } from '../controllers/users.controller.js'
import { addCartToUser } from '../controllers/cart.controller.js'

const router = Router()

router.post('/:idUser/cart/:_id', addCartToUser)

router.get('/current/:idUser', findOneUserById)

export default router