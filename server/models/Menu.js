import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        unique: true,
        trim : true,
    },
    image: {
        url: String,
        public_id: String
    },
    short_description: {
        type : String,
        trim : true,
    },
    price: {
        type : Number,
        required : true,
        trim : true,
    },
    category : {
        type : String,
        required : true,
        trim: true
    },
    discount: {
        type : Number,
        trim : true,
    },
    points: {
        type : Number,
        trim : true,
    }
},{
    timestamps: true
})

export default mongoose.model('Menu', menuSchema)