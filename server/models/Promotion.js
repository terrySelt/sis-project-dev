import mongoose, { Schema } from "mongoose";

const promotionSchema = new mongoose.Schema({
    name: {
        type : String,
        trim : true
    },
    apply_user:[{
        ref: "User",
        type: Schema.Types.ObjectId
    }], 
    apply_menu: [{
        ref: "Menu",
        type: Schema.Types.ObjectId
    },],
    limit: {
        type : Number,
        trim : true
    },
    value_coupon: {
        ref: "Coupon",
        type: Schema.Types.ObjectId
    },
    value_desPM: {
        type : Number,
        trim : true
    },
    value_desPP: {
        type : Number,
        trim : true
    },
    message: {
        type : String,
        trim : true
    },
    state: {
        type: Boolean,
        default: false
    },
    Activation_date: {
        type : Date,
        trim : true
    },
    end_date: {
        type : Date,
        trim : true
    },
},{
    timestamps: true
})

export default mongoose.model('Promotion', promotionSchema)