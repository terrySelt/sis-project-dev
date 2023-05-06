import { Router } from "express";
import {createPromotions, deletePromotions, getPromotion, getPromotions, updatePromotions} from "../controllers/promotions.controllers.js";
//import { verifyToken, admin, user } from "../middlewares/authJwt.js";

const router = Router()

router.get('/promotions', getPromotions)
router.post('/promotions', createPromotions)
router.put('/promotions/:id', updatePromotions)
router.delete('/promotions/:id', deletePromotions)
router.get('/promotions/:id', getPromotion)

export default router