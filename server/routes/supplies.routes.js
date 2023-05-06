import { Router } from "express";
import {createSupplie, deleteSupplie, getSupplie, getSupplies, updateSupplie} from "../controllers/supplies.controllers.js";
//import { verifyToken, admin, user } from "../middlewares/authJwt.js";

const router = Router()

router.get('/supplies', getSupplies)
router.post('/supplies', createSupplie)
router.put('/supplies/:id', updateSupplie)
router.delete('/supplies/:id', deleteSupplie)
router.get('/supplies/:id', getSupplie)

export default router