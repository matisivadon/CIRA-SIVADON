import { Router } from 'express'
import {findAllUsers, createAUser, changeUserRole, documentUploader, getAllUsers, deleteUsers} from '../controllers/users.controller.js'
import { uploader } from '../utils.js'

const router = Router()

router.post('/login', findAllUsers)

router.post('/registro', createAUser)

router.put('/premium/:uid', changeUserRole)

router.post('/premium/:uid/document', uploader.fields([
    {name: 'profileImage'},
    {name: 'productImage'},
    {name: 'identification'},
    {name: 'address'},
    {name: 'account'}
]), documentUploader)

router.get('/', getAllUsers)

router.delete('/', deleteUsers)

export default router