import Catmenu from '../models/Catmenu.js'

export const getCatmenus = async (req, res) => {
    try {
        const catmenus = await Catmenu.find()
        res.send(catmenus)
    } catch (error) {
       return res.status(500).json({message: error.message})
    }
}

export const createCatmenu = async (req, res) => {
    try {
        const {name} = req.body
        const newCatmenu = new Catmenu({name})
        await newCatmenu.save()
        return res.json(newCatmenu)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateCatmenu = async (req, res) => {
    try {
        const updatedCatmenu = await Catmenu.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.send(updatedCatmenu)
    } catch (error) {
        return res.status(500).json({message: error.message})
    } 
}

export const deleteCatmenu = async (req, res) => {
    try {
        const catmenuRemoved = await Catmenu.findByIdAndDelete(req.params.id)
        if(!catmenuRemoved) return res.sendStatus(404)
        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getCatmenu = async (req, res) => {
    try {
        const catmenu = await Catmenu.findById(req.params.id)
        if(!catmenu) return res.sendStatus(404)
        return res.json(catmenu)
    } catch (error) {
        return res.status(500).json({message: error.message})
    } 
}
