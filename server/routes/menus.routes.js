import {Router} from 'express'
import {createMenu, deleteMenu, getMenu, getMenus, updateMenu} from '../controllers/menus.controllers.js'
const router = Router()

router.get('/menus', getMenus)

router.post('/menus', createMenu)

router.put('/menus/:id', updateMenu)

router.delete('/menus/:id', deleteMenu)

router.get('/menus/:id', getMenu)

export default router