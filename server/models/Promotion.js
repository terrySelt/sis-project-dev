import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        trim : true,
    },
    apply: {
        type : String,
        required : true,
        trim : true,
    },
    value: {
        type : String,
        trim : true,
    },
    message: {
        type : String,
        trim : true,
    },
    Activation_date: {
        type : Date,
        trim : true,
    },
    end_date: {
        type : Date,
        trim : true,
    },
},{
    timestamps: true
})

export default mongoose.model('Promotion', promotionSchema)