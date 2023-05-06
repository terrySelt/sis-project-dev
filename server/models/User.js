import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    ci: {
        type : String,
        required : true,
        trim : true,
    },
    name: {
        type : String,
        required : true,
        trim : true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        trim: true,
    },
    image: {
        url: {
            type: String,
            default:'https://res.cloudinary.com/dvgn925ka/image/upload/v1683148526/sis-project/usuario1_v6gx5a.jpg'
        },
        public_id: {
            type: String,
            default: "sis-project/usuario1_v6gx5a.jpg"
        },
    },
    gender: {
        type : String,
        trim : true,
    },
    age: {
        type : Date,
        trim : true,
    },
    accumulated_points: {
        type : Number,
        trim : true,
        default :0
    },
    number_of_visits: {
        type : Number,
        trim : true,
        default: 1
    },
    spent_money: {
        type : Number,
        trim : true,
        default: 0
    },
    coupons: [{
        ref: "Coupon",
        type: Schema.Types.ObjectId,
        amount : Number,
    }],
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }] 
},{
    timestamps: true
})

userSchema.statics.encriptPassword = async (password) => {
    return await  bcrypt.hash(password, 10)
}

userSchema.statics.comparePassword = async (password, receivePassword) => {
    return await bcrypt.compare(password, receivePassword)
}

export default mongoose.model('User', userSchema)


