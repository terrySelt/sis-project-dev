import mongoose, {Schema} from "mongoose";

const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    value: {
        type: Number,
        trim: true
    }
},{
    timestamps: true
})

export default mongoose.model('Coupon', couponSchema)