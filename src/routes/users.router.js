import { Router } from 'express'
import {findAllUsers, createAUser, changeUserRole} from '../controllers/users.controller.js'

const router = Router()

router.post('/login', findAllUsers)

router.post('/registro', createAUser)

router.put('/premium/:uid', changeUserRole)

export default router