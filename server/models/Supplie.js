import mongoose from "mongoose";

const supplieSchema = new mongoose.Schema({
    product: {
        type : String,
        required : true,
        trim : true,
    },
    price: {
        type : Number,
        required : true,
        trim : true,
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
    name_supplier: {
        type : String,
        trim : true,
    },
    number_supplier: {
        type : Number,
        trim : true,
    },
    detail: {
        type : String,
        trim : true,
    },
},{
    timestamps: true
})

export default mongoose.model('Supplie', supplieSchema)