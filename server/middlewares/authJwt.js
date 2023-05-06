import jwt from 'jsonwebtoken'
import { SECRET } from '../config.js'
import User from '../models/User.js'
import Role from '../models/Role.js'

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]

        if (!token) return res.status(403).json({message: "No token provided"})
    
        const decoded = jwt.verify(token, SECRET)
        req.userId = decoded.id
        const user = await User.findById(req.userId, {password: 0})
    
        if (!user) return res.status(404).json({message: "no user found"})
    
        next()

    } catch (error) {
        return res.status(401).json({message: "Unauthorized"})
    }
}

export const admin = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const role = await Role.find({_id: {$in: user.roles}})

    for (let i = 0 ; i < role.length; i++){
        if(role[i].name === "admin"){
            next()
            return
        }
    }
    return res.status(403).json({message: "Require Admin role"})
}

export const user = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const role = await Role.find({_id: {$in: user.roles}})

    for (let i = 0 ; i < role.length; i++){
        if(role[i].name === "user"){
            next()
            return
        }
    }
    return res.status(403).json({message: "Require User role"})
}
