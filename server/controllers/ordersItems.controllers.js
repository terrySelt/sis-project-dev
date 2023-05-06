import OrderItem from '../models/OrderItem.js'
import Menu from '../models/Menu.js'
import Order from '../models/Order.js'

export const getOrdersItems = async (req, res) => {
    try {
        const ordersitems = await OrderItem.find()
        res.send(ordersitems)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createOrderItem = async (req, res) => {
    try {
        const {order_id, menu_id, amount} = req.body

        let total

        const menu = await Menu.findById(menu_id)

        total = amount * menu.price

        const newOrderItem = new OrderItem({order_id, menu_id, amount, total})
        await newOrderItem.save()

        const order = await Order.findById(order_id)
        const ordercal = order.total + total
        const updatedOrder = await Order.findByIdAndUpdate(order._id, {total: ordercal}, {new: true})

        return res.json(newOrderItem)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateOrderItem = async (req, res) => {
    try {
        const updatedOrderItem = await OrderItem.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.send(updatedOrderItem)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteOrderItem = async (req, res) => {
    try {
        const orderItemRemoved = await OrderItem.findByIdAndDelete(req.params.id)
        if(!orderItemRemoved) return res.sendStatus(404)
        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getOrderItem = async (req, res) => {
    try {
        const orderItem = await OrderItem.findById(req.params.id)
        if(!orderItem) return res.sendStatus(404)
        return res.json(order)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}