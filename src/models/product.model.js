const mongoose  = require("mongoose");
const { GeneralStatus } = require("../utilities/constants");

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        min:2,
        max:50,
        required:true
    },
    slug:{
        type:String,
        unique:true,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"Category",
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stockQuantity:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:Object.values(GeneralStatus),
        default:GeneralStatus.INACTIVE
    },
    images:{
        type:String,
        required:true
    }
    
}, {
    timestamps:true,
    autoCreate:true,
    autoIndex:true
})

const ProductModel = mongoose.model('Products', ProductSchema)
module.exports = ProductModel
