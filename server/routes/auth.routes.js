import { Router } from "express";

import {login, recovery, changepassword} from '../controllers/auth.controllers.js'

const router = Router()

router.post('/login', login)
router.post('/recovery', recovery)
router.post('/changepassword/:token', changepassword)

export default router