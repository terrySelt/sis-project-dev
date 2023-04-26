import mongoose from "mongoose"

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }
})

export default mongoose.model('Role', roleSchema)