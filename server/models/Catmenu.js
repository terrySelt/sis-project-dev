import mongoose from "mongoose";

const catmenuSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        unique: true,
        trim : true,
    }
})

export default mongoose.model('Catmenu', catmenuSchema)