import Category from '../models/Category.js'

export const getCategorys = async (req, res) => {
    try {
        const categorys = await Category.find()
        res.send(categorys)
    } catch (error) {
       return res.status(500).json({message: error.message})
    }
}

export const createCategory = async (req, res) => {
    try {
        const {name} = req.body
        const newCategory = new Category({name})
        await newCategory.save()
        return res.json(newCategory)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.send(updatedCategory)
    } catch (error) {
        return res.status(500).json({message: error.message})
    } 
}

export const deleteCategory = async (req, res) => {
    try {
        const categoryRemoved = await Category.findByIdAndDelete(req.params.id)
        if(!categoryRemoved) return res.sendStatus(404)
        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if(!category) return res.sendStatus(404)
        return res.json(category)
    } catch (error) {
        return res.status(500).json({message: error.message})
    } 
}