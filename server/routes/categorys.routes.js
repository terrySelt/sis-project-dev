import {Router} from 'express'
import {createCategory, deleteCategory, getCategorys, getCategory, updateCategory} from '../controllers/categorys.controllers.js'
const router = Router()

router.get('/categorys', getCategorys)

router.post('/categorys', createCategory)

router.put('/categorys/:id', updateCategory)

router.delete('/categorys/:id', deleteCategory)

router.get('/categorys/:id', getCategory)

export default router