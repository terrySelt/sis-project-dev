import OrderItem from '../models/OrderItem.js'
//import User from '../models/User.js'
//import OrderItem from '../models/OrderItem.js'

export const getOrdersItems = async (req, res) => {
    try {
        const ordersitems = await OrderItem.find().populate("menu_id").populate("order_item")
        res.send(ordersitems)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createOrderItem = async (req, res) => {
    try {
        const {order_item, user_id} = req.body
        let total = null
        const newOrderItem = new Menu({order_item, user_id, total})
        await newOrderItem.save()
        return res.json(newOrderItem)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}