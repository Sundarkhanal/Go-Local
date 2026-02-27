const mongoose  = require("mongoose");
const { OrderStatus} = require("../utilities/constants");


const OrderSchema = mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    products:[
        {
            productId:{
                type:mongoose.Types.ObjectId,
                ref:"Product",
                required:true
            },
            quantity:{
                type:Number,
                required:true,
                min:1
            },
            price:{
                type:Number,
                required:true
            }
        }
    ],
    totalPrice:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:Object.values(OrderStatus),
        default:OrderStatus.PENDING

    },
    
},{
    timestamps: true
})

const OrderModel = mongoose.model("Order", OrderSchema)
module.exports = OrderModel