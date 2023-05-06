import { Router } from "express";
import {createUser, deleteUser, getUser, getUsers, updateUser} from "../controllers/users.controllers.js";
//import { verifyToken, admin, user } from "../middlewares/authJwt.js";

const router = Router()

router.get('/users', getUsers)
router.post('/users', createUser)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)
router.get('/users/:id', getUser)

export default router