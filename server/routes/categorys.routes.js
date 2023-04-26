import {Router} from 'express'
import {createCategory, deleteCategory, getCategorys, getCategory, updateCategory} from '../controllers/categorys.controllers.js'
const router = Router()

router.get('/categorys', getCategorys)

router.post('/category', createCategory)

router.put('/category/:id', updateCategory)

router.delete('/category/:id', deleteCategory)

router.get('/category/:id', getCategory)

export default router