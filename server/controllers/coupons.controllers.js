import Coupon from '../models/Coupon.js'
import {uploadImage, deleteImage} from '../libs/cloudinary.js'
import fs from 'fs-extra'
import {setTimeout} from 'timers/promises'

export const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find()
        res.send(coupons)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createCoupons = async (req, res) => {
    try {
        const {name, detail, value_mony, value_percentage, expiration_date, word} = req.body

        let code = "MIGOS-" || word
        const long = 8
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let coderandom =''
        for(let i=0; i<long; i++){
            let random = Math.floor(Math.random()* characters.length)
            coderandom += characters.charAt(random)    
        }
        code = code+coderandom
        
        let image = null
        if(req.files?.image){
            const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }

        const newCoupon = new Coupon({code, name, detail, value_mony, value_percentage, expiration_date, image})
        await newCoupon.save()
 
        const conv = new Date(expiration_date)
        const conv1 = new Date(conv).toISOString()
        const conv2= new Date(conv1).getTime()

        const dateNow = new Date()
        const dateNow1=  dateNow.toLocaleString()
        const dateNow2 = new Date(dateNow1).toISOString()
        const dateNow3 = new Date(dateNow2).getTime()
        const limit = conv2 - dateNow3

        const func = async () => {
            await setTimeout(limit); 
            const coupon = await Coupon.findByIdAndDelete(newCoupon._id)
            console.log( 'Hi after',limit, 'seconds')
        }
        
        func()

        return res.json(newCoupon)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

export const updateCoupons = async (req, res) => {
    try {
        let image

        if(req.files?.image){
            if(menu.name.public_id!=="sis-project/logo_ivck51.png"){
                await deleteImage(menu.image.public_id)
            }
            const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
            image = {
                url : result.secure_url,
                public_id : result.public_id
            }
        }
        let body = {
            code : req.body.code,
            name : req.body.name,
            detail : req.body.detail,
            value_mony : req.body.value_mony, 
            value_percentage : req.body.value_percentage,
            expiration_date : req.body.expiration_date,
            image : image
        }
        const updatedCoupons = await Coupon.findByIdAndUpdate(req.params.id, body, {new: true})
        return res.send(updatedCoupons)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteCoupons = async (req, res) => {
    try {
        const couponRemoved = await Coupon.findByIdAndDelete(req.params.id)
        if(!couponRemoved) return res.sendStatus(404)
        if(couponRemoved.image.public_id){
            await deleteImage(couponRemoved.image.public_id)
        }
        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id)
        if(!coupon) return res.sendStatus(404)
        return res.json(coupon)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}