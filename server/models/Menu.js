import mongoose, { Schema } from "mongoose"

const menuSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        unique: true,
        trim : true,
    },
    image: {
        url: {
            type: String,
            default:'https://res.cloudinary.com/dvgn925ka/image/upload/v1683167076/sis-project/h1_y2cbgm.jpg'
        },
        public_id: {
            type: String,
            default: "sis-project/h1_y2cbgm.jpg"
        },
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
        ref: "Category",
        type: Schema.Types.ObjectId
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