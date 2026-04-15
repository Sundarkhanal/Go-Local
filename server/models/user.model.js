
const mongoose = require("mongoose")
const {UserRoles, GeneralStatus, Gender} = require("../utilities/constants")


const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        min:2,
        max:25,
        required: true,
    },
    email:{
        type:String,
        unique: true,
        required:true
    },
    password:{
        type:String,
        required: true
    },
    role:{
        type:String,
        enum: Object.values(UserRoles),
        default: UserRoles.CUSTOMER
    },
    phone: String,
    address: String,
    image:String,
    otp: String,
    expiryTime: Date,
    status:{
        type:String,
        enum: Object.values(GeneralStatus),
        default:GeneralStatus.INACTIVE

    },
    gender:{
        type:String,
        enum:Object.values(Gender)
    },
    passwordResetToken:String,
    passwordResetExpiry: Date,
}, {
    timestamps:true,
    autoCreate:true,
    autoIndex:true
})

const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel