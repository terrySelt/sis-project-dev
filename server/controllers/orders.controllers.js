import Order from '../models/Order.js'
import OrderItem from '../models/OrderItem.js'
import mongoose from 'mongoose'

export const getOrders = async (req, res) => {
    try {
        //const orders = await Order.find()
        const orders = await Order.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'customer_id',
                    foreignField: '_id',
                    as: 'customer'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'responsible_id',
                    foreignField: '_id',
                    as: 'user'
                }
            }, 
            {
                $project: {
                  Cliente: '$customer.name', CI: '$customer.ci', Total: '$total', Efectivo: '$cash', Vuelto: '$change', Pagado: '$paid_status', Entregado: '$delivered_status', Fecha_Emision: '$updatedAt', Responsable: '$user.name'
                }
            }   
        ])
        res.send(orders)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createOrder = async (req, res) => {
    try {
        const {customer_id, responsible_id, cash, paid_status, delivered_status} = req.body

        let total
        let change
        
        const newOrder = new Order({customer_id, responsible_id, total, cash, change, paid_status, delivered_status})
        await newOrder.save()
        return res.json(newOrder)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateOrder = async (req, res) => {
    try {
        if(req.body.cash){
            const order = await Order.findById(req.params.id)
            const change = req.body.cash - order.total
            const cha =  await Order.findByIdAndUpdate(req.params.id, {change: change}, {new: true})
        }
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.send(updatedOrder)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteOrder = async (req, res) => {
    try {
        const orderRemoved = await Order.findByIdAndDelete(req.params.id)
        const orderitemRemoved = await OrderItem.findOneAndDelete({order_id:req.params.id})
        if(!orderRemoved) return res.sendStatus(404)
        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
} 

export const getOrder = async (req, res) => {
    try {
        const order = await Order.aggregate([
        {
            $match: {
              _id : new mongoose.Types.ObjectId(req.params.id)
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'customer_id',
                foreignField: '_id',
                as: 'customer'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'responsible_id',
                foreignField: '_id',
                as: 'user'
            }
        }, 
        {
            $lookup: {
                from: 'orderitems',
                localField: '_id',
                foreignField: 'order_id',
                as: 'item'
            }
        },
        {
            $lookup: {
                from: 'menus',
                localField: 'item.menu_id',
                foreignField: '_id',
                as: 'menu'
            }
        },
        {
            $project: {
              Cliente: '$customer.name', CI: '$customer.ci', Concepto: '$menu.name', Precio: '$menu.price', Cantidad: '$item.amount', Total_item: '$item.total', Total: '$total', Puntos_acumulados: '$customer.accumulated_points', Pagado: '$paid_status', Entregado: '$delivered_status', Fecha_Emision: '$updatedAt', Responsable: '$user.name'
            }
        }   
        ]) 
        if(!order) return res.sendStatus(404)
        return res.json(order)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
