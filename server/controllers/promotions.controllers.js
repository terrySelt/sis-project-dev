import Promotion from '../models/Promotion.js'

export const getPromotions = async (req, res) => {
    try {
        const promotions = await Promotion.find()
        res.send(promotions)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createPromotions = async (req, res) => {
    try {
        const {name, apply, limit, value, message, Activation_date, end_date} = req.body
        
        const newPromotion = new Promotion({name, apply, limit, value, message, Activation_date, end_date})
        await newPromotion.save()
        return res.json(newPromotion)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

export const updatePromotions = async (req, res) => {
    try {
        const updatedPromotion = await Promotion.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.send(updatedPromotion)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deletePromotions = async (req, res) => {
    try {
        const promotionRemoved = await Promotion.findByIdAndDelete(req.params.id)
        if(!promotionRemoved) return res.sendStatus(404)
        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getPromotion = async (req, res) => {
    try {
        const promotion = await Promotion.findById(req.params.id)
        if(!promotion) return res.sendStatus(404)
        return res.json(promotion)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}