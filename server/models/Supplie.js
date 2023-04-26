import mongoose from "mongoose";

const supplieSchema = new mongoose.Schema({
    registration_date: {
        type : Date,
        unique: true,
        required : true,
        trim : true,
    },
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
        required : true,
        trim : true,
    },
    supplier: {
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
})

export default mongoose.model('Supplie', menuSchema)