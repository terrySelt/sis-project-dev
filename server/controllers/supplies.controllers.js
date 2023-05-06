import Supplie from '../models/Supplie.js'

export const getSupplies = async (req, res) => {
    try {
        const supplies = await Supplie.find()
        res.send(supplies)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createSupplie = async (req, res) => {
    try {
        const {product, price, amount, name_supplier, number_supplier, detail} = req.body

        const total = price * amount
        
        const newSupplie = new Supplie({product, price, amount, total, name_supplier, number_supplier, detail})
        await newSupplie.save()
        return res.json(newSupplie)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

export const updateSupplie = async (req, res) => {
    try {
        const supplie = await Supplie.findById(req.params.id)
        if(req.body.price !== supplie.price  && req.body.amount !== supplie.amount){
            const total =  req.body.price * req.body.amount
            const updatedTotal = await Supplie.findByIdAndUpdate(req.params.id, {total : total}, {new: true})
        } else if(req.body.price !== supplie.price){
            const total = req.body.price * supplie.amount
            const updatedTotal = await Supplie.findByIdAndUpdate(req.params.id, {total : total}, {new: true})
        } else if(req.body.amount !== supplie.amount){
            const total = req.body.amount * supplie.price
            const updatedTotal = await Supplie.findByIdAndUpdate(req.params.id, {total : total}, {new: true})
        }
        const updatedSupplie = await Supplie.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.send(updatedSupplie)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteSupplie = async (req, res) => {
    try {
        const supplieRemoved = await Supplie.findByIdAndDelete(req.params.id)
        if(!supplieRemoved) return res.sendStatus(404)
        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getSupplie = async (req, res) => {
    try {
        const supplie = await Supplie.findById(req.params.id)
        if(!supplie) return res.sendStatus(404)
        return res.json(supplie)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}