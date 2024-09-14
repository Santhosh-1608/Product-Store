import express from 'express'

import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller.js';

const router = express.Router()

router.get("/",getProducts)
router.post("/",createProduct)
router.delete("/:id",deleteProduct)
router.put("/:id", updateProduct)

export default  router;
