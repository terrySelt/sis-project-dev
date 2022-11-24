import {Router} from 'express'
import {createCatmenu, deleteCatmenu, getCatmenu, getCatmenus, updateCatmenu} from '../controllers/catmenus.controllers.js'
const router = Router()

router.get('/catmenus', getCatmenus)

router.post('/catmenus', createCatmenu)

router.put('/catmenus/:id', updateCatmenu)

router.delete('/catmenus/:id', deleteCatmenu)

router.get('/catmenus/:id', getCatmenu)

export default router