const  mongoose = require("mongoose");
const { GeneralStatus } = require("../utilities/constants");

const CategorySchema = new mongoose.Schema({
    name: {
        type:String,
        min: 2,
        max:30,
        required:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    parent:{
        type:mongoose.Types.ObjectId,
        ref:'Category',
        default:null

    },
    status:{
        type:String,
        enums:Object.values(GeneralStatus),
        default:GeneralStatus.INACTIVE
    }
    

})

const CategoryModel = mongoose.model('Category', CategorySchema)
module.exports = CategoryModel