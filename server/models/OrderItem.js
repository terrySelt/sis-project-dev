import mongoose, { Schema } from "mongoose";

const orderitemSchema = new mongoose.Schema({
    menu_id: {
        ref: "Menu",
        type: Schema.Types.ObjectId
    },
    amount: {
        type : Number,
        required : true,
        trim : true,
    },
    total: {
        type : Number,
        trim : true,
    },
})

export default mongoose.model('OrderItem', orderitemSchema)