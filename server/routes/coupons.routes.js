import { Router } from "express";
import {createCoupons, deleteCoupons, getCoupon, getCoupons, updateCoupons} from "../controllers/coupons.controllers.js";
//import { verifyToken, admin, user } from "../middlewares/authJwt.js";

const router = Router()

router.get('/coupons', getCoupons)
router.post('/coupons', createCoupons)
router.put('/coupons/:id', updateCoupons)
router.delete('/coupons/:id', deleteCoupons)
router.get('/coupons/:id', getCoupon)

export default router