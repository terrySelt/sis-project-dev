import mongoose, { Schema } from "mongoose"

const orderSchema = new mongoose.Schema({ 
    customer_id: {
        ref: "User",
        type: Schema.Types.ObjectId
    },
    responsible_id: {
        ref: "User",
        type: Schema.Types.ObjectId
    },
    total: {
        type : Number,
        default: 0,
        trim : true,
    },
    cash: {
        type : Number,
        default: 0,
        trim : true,
    },
    change: {
        type : Number,
        default: 0,
        trim : true,
    },
    paid_status: {
        type : Boolean,
        default: false
    },
    delivered_status: {
        type : Boolean,
        default: false
    },
    /* delivery: {
        type : Boolean,
        default: false
    } */
},{
    timestamps: true
})

export default mongoose.model('Order', orderSchema)