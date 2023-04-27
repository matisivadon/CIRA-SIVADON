import {Router} from 'express'
import { generateProduct } from '../utils/mocks.js'

const router = Router()

router.get('/', (req, res) => {
    const products = []
    try {
        for (let i= 0; i < 100; i++) {
            const product = generateProduct()
            products.push(product)
        }
        res.json({message:'Productos generados con éxito', products})
    } catch (error) {
        console.log(error)
    }
})

export default router