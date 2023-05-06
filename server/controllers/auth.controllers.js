import User from "../models/User.js"
import jwt from "jsonwebtoken"
import { SECRET } from "../config.js"
import { USERMAIL, PASSWORDMAIL, SECRETRECOVERY } from "../config.js";
import nodemailer from 'nodemailer';

export const login = async (req, res) => {

    const userFound = await User.findOne({email: req.body.email}).populate("roles")

    if(!userFound) return res.status(400).json({message: "User not found"})

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if(!matchPassword) return res.status(401).json({token: null, message: 'Invalid password'})

    const token = jwt.sign({id: userFound._id}, SECRET, {expiresIn: 86400})

    delete userFound._doc.password
    delete userFound._doc.recoveryToken

    res.json({userFound, token})

}

export const recovery = async (req, res, next) => {
    
    try {
        const {email} = req.body

        const userFound = await User.findOne({email: email})
        if(!userFound) return res.status(400).json({message: "Unauthorized"})

        const token = jwt.sign({id: userFound._id}, SECRETRECOVERY, {expiresIn: '15min'})

        const link = `http://localhost:3000/changepassword?token=${token}`

        try {
          const update = await User.findByIdAndUpdate(userFound._id, {recoveryToken: token}, { new: true})

        } catch (error) {
          return res.status(500).json({message: error.message})
        }
      
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: USERMAIL,
              pass: PASSWORDMAIL
            },
          });
          const send = await transporter.sendMail({
            from: USERMAIL, 
            to: userFound.email, 
            subject: "Email para recuperar contraseña",
            html: `"<b>Ingresa a este link para recuperar la contraseña => ${link}</b>"`
          });

          if(!send) return res.sendStatus(400).json({message: "email not sent"})
          return res.json({message: "mail sent"})

    } catch (error) {
        next(error)
    }
    
}

export const changepassword = async (req, res, next) => {
  const {token} = req.params
  const {newPassword} = req.body

  try {
    const decoded = jwt.verify(token, SECRETRECOVERY)
        req.userId = decoded.id
        const user = await User.findById(req.userId, {password: 0})
    
        if (!user) return res.status(404).json({message: "Unauthorized"})

        if(user.recoveryToken !== token) return res.status(404).json({message: "Unaut horized"})

        const encript = await User.encriptPassword(newPassword)

        const update = await User.findByIdAndUpdate(user._id, {recoveryToken: null, password: encript}, { new: true})

        return res.send({message: 'password change'})
    
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
} 

