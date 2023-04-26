import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
    customer_name: {
        type : String,
        required : true,
        trim : true,
    },
    Customer_identification: {
        type : String,
        required : true,
        unique: true,
        trim : true,
    },
    name_menu: {
        type : String,
        required : true,
        trim : true,
    },
    unit_price: {
        type : Number,
        required : true,
        trim : true,
    },
    amount: {
        type : Number,
        required : true,
        trim : true,
    },
    total_price: {
        type : Number,
        required : true,
        trim : true,
    },
    totals: {
        type : Number,
        required : true,
        trim : true,
    }, 
    way_to_pay: {
        type : Number,
        required : true,
        trim : true,
    }, 
    return: {
        type : Number,
        trim : true,
    },
    date_of_issue: {
        type: Date,
        required: true,
        trim: true
    },
    responsible: {
        type : String,
        required : true,
        trim : true,
    },
    accumulated_points: {
        type : Number,
        trim : true,
    },
})

export default mongoose.model('Sale', menuSchema)