const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
                required: true
            },

            quantity: {
                type: Number,
                default: 1,
                min: 1
            },

            price: {
                type: Number,
                required: true
            }
        }
    ],

    totalPrice: {
        type: Number,
        default: 0
    }

},
{
    timestamps:true,
    autoCreate:true,
    autoIndex:true
});

const CartModel = mongoose.model("CartModel", CartSchema)
module.exports = CartModel