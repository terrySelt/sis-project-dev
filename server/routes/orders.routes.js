import {Router} from 'express'
import {createOrder,  getOrders} from '../controllers/orders.controllers.js'
const router = Router()

router.get('/orders', getOrders)

router.post('/orders', createOrder)

//router.put('/orders/:id', updateOrder)

//router.delete('/orders/:id', deleteOrder)

//router.get('/orders/:id', getOrder)

export default router