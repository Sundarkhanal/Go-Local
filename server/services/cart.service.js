const CartModel = require("../models/cart.model");
const ProductModel = require("../models/product.model");

class CartService {

    async addToCart(userId, productId, quantity) {
        try {

            const product =  await ProductModel.findById(productId);
            if (!product) {
                throw new Error("Product not found");
            }
            let cart = await CartModel.findOne({ user: userId });


            if (!cart) {
                cart = new CartModel({
                    user: userId,
                    items: [{
                        productId: product._id,
                        quantity,
                        price: product.price
                    }],
                    totalPrice: product.price * quantity
                });
            } else {

                const itemIndex = cart.items.findIndex(
                    item => item.productId.toString() === product._id.toString()
                );

                if (itemIndex > -1) {

                    cart.items[itemIndex].quantity += quantity;
                } else {
                    cart.items.push({
                        productId: product._id,
                        quantity,
                        price: product.price
                    });
                }

                cart.totalPrice = cart.items.reduce(
                    (total, item) => total + item.quantity * item.price,
                    0
                );
            }

            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }


    async getCart(userId) {
        try {
            return await CartModel.findOne({ user: userId })
                .populate("items.productId", "name price"); 
        } catch (error) {
            throw error;
        }
    }

    async removeCartItem(userId, productId) {
        try {
            const cart = await CartModel.findOne({ user: userId });
            if (!cart) throw new Error("Cart not found");

            cart.items = cart.items.filter(
                item => item.productId.toString() !== productId
            ); //"Remove the item whose productId matches"

            cart.totalPrice = cart.items.reduce(
                (total, item) => total + item.quantity * item.price,
                0
            );

            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async updateCartItem(userId, productId, quantity) {
        try {
            const cart = await CartModel.findOne({ user: userId });
            if (!cart) throw new Error("Cart not found");

            const itemIndex = cart.items.findIndex(
                item => item.productId.toString() === productId
            );

            if (itemIndex === -1) throw new Error("Product not in cart");

            cart.items[itemIndex].quantity = quantity;

            // Recalculate total price
            cart.totalPrice = cart.items.reduce(
                (total, item) => total + item.quantity * item.price,
                0
            );

            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async clearCart(userId) {
        try {
            const cart = await CartModel.findOne({ user: userId });
            if (!cart) throw new Error("Cart not found");

            cart.items = [];
            cart.totalPrice = 0;

            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CartService();