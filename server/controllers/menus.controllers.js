import Menu from '../models/Menu.js'
import {uploadImage, deleteImage} from '../libs/cloudinary.js'
import fs from 'fs-extra'

export const getMenus = async (req, res) => {
    try {
        const menus = await Menu.find()
        res.send(menus)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createMenu = async (req, res) => {
    try {
        const {name, short_description, price, category, discount, points} = req.body
        let image = null
        if(req.files?.image){
            const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }
        const newMenu = new Menu({name, image, short_description, price, category, discount, points})
        await newMenu.save()
        return res.json(newMenu)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

export const updateMenu = async (req, res) => {
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
}

export const getMenu = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id)
        if(!menu) return res.sendStatus(404)
        return res.json(menu)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}