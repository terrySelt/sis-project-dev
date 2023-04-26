import mongoose, { Schema } from "mongoose"

const orderSchema = new mongoose.Schema({
    orderitem_id: [{
        ref: "OrderItem",
        type: Schema.Types.ObjectId
    }],

    user_id: {
        ref: "User",
        type: Schema.Types.ObjectId
    },
    total: {
        type : Number,
        trim : true,
    },
    state: {
        type : Boolean,
        default: false
    },
},{
    timestamps: true
})

export default mongoose.model('Order', orderSchema)