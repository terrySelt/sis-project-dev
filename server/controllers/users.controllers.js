import User from "../models/User.js"
import Role from "../models/Role.js"

import {uploadImage, deleteImage} from "../libs/cloudinary.js"
import fs from "fs-extra"

export const getUsers = async (req, res) => {
    try {
        //const users = await User.find().populate("roles").select("-password -recoveryToken")
        const users = await User.find().populate("roles")
        res.send(users)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


export const createUser = async (req, res) => {
    try {
        const {name, email, gender, age, roles, password} = req.body
        let image;
        if(req.files?.image){
            const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
            image = {
                url : result.secure_url,
                public_id : result.public_id
            }
        }

        const newUser = new User({name, email, image, gender, age, roles, password: await User.encriptPassword(password)})

        if(roles==="admin"){
            const roleadmin = await Role.findOne({name: "admin"})
            const roleuser = await Role.findOne({name: "user"})
            const rolecustomer = await Role.findOne({name: "customer"})
            newUser.roles = [roleadmin._id, roleuser._id, rolecustomer._id] 
        } 
        if(roles==='user'){
            const roleuser = await Role.findOne({name: "user"})
            const rolecustomer = await Role.findOne({name: "customer"})
            newUser.roles = [roleuser._id, rolecustomer._id]
        } 
        if(roles==='customer'){
            const rolecustomer = await Role.findOne({name: "customer"})
            newUser.roles = [rolecustomer._id]
        } 
        
        await newUser.save()
/*      delete newUser._doc.password
        delete newUser._doc.recoveryToken */
        return res.json(newUser)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateUser = async (req, res) => {
     try {
        
        const user = await User.findById(req.params.id)//user por el id

        const roleadmin = await Role.findOne({name: "admin"})
        const roleuser = await Role.findOne({name: "user"})
        const rolecustomer = await Role.findOne({name: "customer"})

        let image

        if(req.files?.image){
            if(user.name.public_id!=="prototipo/1_pqf1ax.png"){
                await deleteImage(user.image.public_id)
            }
            const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
            image = {
                url : result.secure_url,
                public_id : result.public_id
            }
        }

        let body = {
            name: req.body.name,
            image: image,
            email: req.body.email,
            gender: req.body.gender,
            age: req.body.age,
            oldpassword: req.body.oldpassword,
            newpassword: req.body.newpassword,
            confirmpassword: req.body.confirmpassword
        }   


        const matchPassword = await User.comparePassword(body.oldpassword, user.password)
        if(matchPassword){
            if(body.newpassword === body.confirmpassword){
                const encript = await User.encriptPassword(body.newpassword)
                const updatedPassword = await User.findByIdAndUpdate(user._id, {password: encript}, { new: true})
                if(!updatedPassword) return res.status(500).json({message: 'the passwords are not the same'})
            }else{
                    return res.status(500).json({message: 'the passwords are not the same'})    
                }
        }

        const admin = user.roles.find(item => item.toString() === roleadmin._id.toString())
        const userrole = user.roles.find(item => item.toString() === roleuser._id.toString())
        const customer = user.roles.find(item => item.toString() === rolecustomer._id.toString())        
        
        if(req.body.roles === 'admin'){
            if(!admin){
                const updatedroleadmin = await User.findByIdAndUpdate(req.params.id, {$push: {"roles": roleadmin._id}}, { new: true}) 
            }
            if(!userrole){
                const updatedroleuser = await User.findByIdAndUpdate(req.params.id, {$push: {"roles": roleuser._id}}, { new: true})
            }
            if(!customer){
                const updatedrolecustomer = await User.findByIdAndUpdate(req.params.id, {$push: {"roles": rolecustomer._id}}, { new: true})
            }
                    
        } else if(req.body.roles === 'user'){
            if(!userrole){
                const updatedroleuser = await User.findByIdAndUpdate(req.params.id, {$push: {"roles": roleuser._id}}, { new: true})
            }
            if(!customer){
                const updatedrolecustomer = await User.findByIdAndUpdate(req.params.id, {$push: {"roles": rolecustomer._id}}, { new: true})
            }
            const updatedrole = await User.findByIdAndUpdate(req.params.id, {$pull: {"roles": admin}}, { new: true})

        } else if(req.body.roles === 'customer'){
            if(!customer){
                const updatedrolecustomer = await User.findByIdAndUpdate(req.params.id, {$push: {"roles": rolecustomer._id}}, { new: true})
            }
            const updatedroleadmin = await User.findByIdAndUpdate(req.params.id, {$pull: {"roles": admin}}, { new: true})
            const updatedroleuser = await User.findByIdAndUpdate(req.params.id, {$pull: {"roles": userrole}}, { new: true})
        } 

        const updatedUser = await User.findByIdAndUpdate(req.params.id, body, { new: true})
        //delete updatedUser._doc.password
        //elete updatedUser._doc.recoveryToken
        return res.send(updatedUser)

    } catch (error) {
        return res.status(500).json({message: error.message})
    }     
}

export const deleteUser = async (req, res) => {
    try {
        const userRemoved = await User.findByIdAndDelete(req.params.id)
        
        if(!userRemoved) return res.sendStatus(404)
        
        if(userRemoved.image.public_id) {
            await deleteImage(userRemoved.image.public_id)
        }

        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getUser = async (req, res) => {
    try {
        //const user = await User.findById(req.params.id).populate("roles").select("-password -recoveryToken")
        const user = await User.findById(req.params.id).populate("roles")
        if(!user) return res.sendStatus(404)
        return res.json(user)
    } catch (error) {
        return res.status(500).json({message: error.message})
    } 
    
}