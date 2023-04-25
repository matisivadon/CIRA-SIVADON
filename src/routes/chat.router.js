import {Router} from 'express'
import { isUser } from '../middlewares/auth.middlewares.js'

const router = Router()

router.get('/', isUser, (req, res) => {
    res.render('chat')
})

export default router