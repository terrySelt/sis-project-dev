import mongoose, {Schema} from "mongoose";

const couponSchema = new mongoose.Schema({
    code:{
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    detail: {
        type: String,
        trim: true
    },
    value_mony: {
        type: Number,
        default: 0,
        trim: true
    },
    value_percentage: {
        type: Number,
        default: 0,
        trim: true
    },
    expiration_date: {
        type : Date,
        trim : true
    },
    image: {
        url: {
            type: String,
            default:"https://res.cloudinary.com/dvgn925ka/image/upload/v1683499144/sis-project/logo_ivck51.png"
        },
        public_id: {
            type: String,
            default: "sis-project/logo_ivck51.png"
        },
    }
},{
    timestamps: true
})

export default mongoose.model('Coupon', couponSchema)