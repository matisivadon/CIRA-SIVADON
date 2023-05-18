import {Router} from "express";
import { getAllTheProducts, getAProductById, addAProduct, updateAProduct, deleteAProduct } from "../controllers/products.controller.js";

const router = Router()

router.get('/', getAllTheProducts)

router.get('/:pid', getAProductById)

router.post('/', addAProduct)

router.put('/:pid', updateAProduct)

router.delete('/:pid', deleteAProduct)

export default router