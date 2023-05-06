import {Router} from 'express'
import {createOrderItem, getOrdersItems, updateOrderItem, deleteOrderItem, getOrderItem} from '../controllers/ordersItems.controllers.js'
const router = Router()

router.get('/orderitems', getOrdersItems)

router.post('/orderitems', createOrderItem)

router.put('/orderitems/:id', updateOrderItem)

router.delete('/orderitems/:id', deleteOrderItem)

router.get('/orderitems/:id', getOrderItem)

export default router