import { Router } from 'express'
import { sendEmail, getPassword } from '../controllers/mail.controller.js'

const router = Router()

router.post('/', sendEmail)

router.post('/recuperarclave', getPassword)

export default router