import OrderItem from '../models/OrderItem.js'
import Menu from '../models/Menu.js'
import Order from '../models/Order.js'
import User from '../models/User.js'
import Promotion from '../models/Promotion.js'

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
        const promotion = await Promotion.findOne({name:"Puntos acumulados"})
        const order = await Order.findById(order_id)
        const customer = await User.findById(order.customer_id)

        total = amount * menu.price

        if(menu.points){
            
            let acum_points = customer.accumulated_points + menu.points * amount
            if(acum_points >= promotion.limit ){
                let calc = acum_points - promotion.limit
                acum_points = calc
                
            }
            const updatedacumpoints = await User.findByIdAndUpdate(customer._id, {accumulated_points: acum_points}, {new: true})
        }

        const newOrderItem = new OrderItem({order_id, menu_id, amount, total})
        await newOrderItem.save()

//calculo del total de totales
        const ordercal = order.total + total
        const updatedOrder = await Order.findByIdAndUpdate(order._id, {total: ordercal}, {new: true})

        return res.json(newOrderItem)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateOrderItem = async (req, res) => {
    try {
        const {amount} = req.body

        const orderitem = await OrderItem.findById(req.params.id)
        const order = await Order.findById(orderitem.order_id)
        const menu = await Menu.findById(orderitem.menu_id)
        //calculo del total de totales
        if(amount > orderitem.amount){
            const cant = amount - orderitem.amount
            const total2 = cant * menu.price
            const ordercal = order.total + total2
            const updatedOrder = await Order.findByIdAndUpdate(order._id, {total: ordercal}, {new: true})
        }else if(amount < orderitem.amount){
            const cant = orderitem.amount - amount
            const total2 = cant * menu.price
            const ordercal = order.total - total2
            const updatedOrder = await Order.findByIdAndUpdate(order._id, {total: ordercal}, {new: true})
        }

        //calculo de la acumulacion de puntos
        
        if(menu.points){
            const customer = await User.findById(order.customer_id)
            if(amount > orderitem.amount){
                const cant = amount - orderitem.amount
                const total2 = cant * menu.points
                const acum_points = customer.accumulated_points + total2
                const updatedacumpoints = await User.findByIdAndUpdate(customer._id, {accumulated_points: acum_points}, {new: true})
                
            }else if(amount < orderitem.amount){
                const cant = orderitem.amount - amount 
                const total2 = cant * menu.points
                const acum_points = customer.accumulated_points - total2
                const updatedacumpoints = await User.findByIdAndUpdate(customer._id, {accumulated_points: acum_points}, {new: true})
            }
        } 

        let total

        total = amount * menu.price

        const updatedOrderItem = await OrderItem.findByIdAndUpdate(req.params.id, {amount: amount, total: total}, {new: true})

        return res.send(updatedOrderItem)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteOrderItem = async (req, res) => {
    try {
        const orderitem = await OrderItem.findById(req.params.id)

        const menu = await Menu.findById(orderitem.menu_id)

        const order = await Order.findById(orderitem.order_id)

        //calculo de la acumulacion de puntos

        if(menu.points){
            
            const customer = await User.findById(order.customer_id)
            const acum_points = customer.accumulated_points - menu.points * orderitem.amount
            const updatedacumpoints = await User.findByIdAndUpdate(customer._id, {accumulated_points: acum_points}, {new: true})
        }

        //calculo del total de totales
    
        const ordercal = order.total - orderitem.total
        const updatedOrder = await Order.findByIdAndUpdate(order._id, {total: ordercal}, {new: true})

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
        return res.json(orderItem)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}