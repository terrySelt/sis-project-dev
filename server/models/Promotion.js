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
    image: {
        url: String,
        public_id: String
    },
    Activation_date: {
        type : Date,
        trim : true,
    },
    end_date: {
        type : Date,
        trim : true,
    },
    registration_date: {
        type : Date,
        trim : true,
    },
})

export default mongoose.model('Promotion', menuSchema)