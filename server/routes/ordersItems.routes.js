import {Router} from 'express'
import {createOrderItem, getOrdersItems} from '../controllers/ordersItems.controllers.js'
const router = Router()

router.get('/ordersitems', getOrdersItems)

router.post('/ordersitem', createOrderItem)

//router.put('/ordersitem/:id', updateOrderItem)

//router.delete('/ordersitem/:id', deleteOrderItem)

//router.get('/ordersitem/:id', getOrderItem)

export default router