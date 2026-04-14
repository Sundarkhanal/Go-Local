const mongoose = require("mongoose")
const { PaymentStatus } = require("../utilities/constants")

const PaymentSchema = new mongoose.Schema({
    order:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Order",
        requred:true
    },
    transactionId:{
        type: String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    paymentMethod:{
        type:String,
        enum:["esewa"],
        default:"esewa"
    },
    status:{
        type:String,
        enum: Object.values(PaymentStatus),
        default:PaymentStatus.PENDING
    },
    esewaResponse:{
        type:Object
    },
}, {
    timestamps:true,
    autoCreate:true
})

const PaymentModel = mongoose.model("Payment", PaymentSchema)
module.exports = PaymentModel