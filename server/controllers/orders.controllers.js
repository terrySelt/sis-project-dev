//import {uploadImage, deleteImage} from '../libs/cloudinary.js'
//import fs from 'fs-extra'
import Order from '../models/Order.js'
//import User from '../models/User.js'
//import OrderItem from '../models/OrderItem.js'

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user_id").populate("order_item")
        res.send(orders)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createOrder = async (req, res) => {
    try {
        const {order_item, user_id} = req.body
        let total = null
        const newOrder = new Menu({order_item, user_id, total})
        await newOrder.save()
        return res.json(newOrder)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

/* export const updateMenu = async (req, res) => {
    try {
        const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.send(updatedMenu)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteMenu = async (req, res) => {
    try {
        const menuRemoved = await Menu.findByIdAndDelete(req.params.id)
        if(!menuRemoved) return res.sendStatus(404)
        if(menuRemoved.image.public_id){
            await deleteImage(menuRemoved.image.public_id)
        }
        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
} */

export const getMenu = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id)
        if(!menu) return res.sendStatus(404)
        return res.json(menu)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
