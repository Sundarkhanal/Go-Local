const CartModel = require("../models/cart.model");
const ProductModel = require("../models/product.model");

class CartService {
    // Add product to cart
    async addToCart(userId, productId, quantity) {
        try {
            // Find the product in DB
            const product = await ProductModel.findById(productId);
            if (!product) {
                throw new Error("Product not found");
            }
            let cart = await CartModel.findOne({ user: userId });

            // If no cart exists, create one
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
                // Check if product already exists in cart
                const itemIndex = cart.items.findIndex(
                    item => item.productId.toString() === product._id.toString()
                );

                if (itemIndex > -1) {
                    // Product exists → update quantity
                    cart.items[itemIndex].quantity += quantity;
                } else {
                    // Product not in cart → push new item
                    cart.items.push({
                        productId: product._id,
                        quantity,
                        price: product.price
                    });
                }

                // Update total price
                cart.totalPrice = cart.items.reduce(
                    (total, item) => total + item.quantity * item.price,
                    0
                );
            }

            //  Save cart
            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }

    // Get user's cart
    async getCart(userId) {
        try {
            const cart = await CartModel.findOne({ user: userId })
                .populate("items.productId", "name price"); // optional populate
            return cart;
        } catch (error) {
            throw error;
        }
    }

    // Remove a product from cart
    async removeCartItem(userId, productId) {
        try {
            const cart = await CartModel.findOne({ user: userId });
            if (!cart) throw new Error("Cart not found");

            cart.items = cart.items.filter(
                item => item.productId.toString() !== productId
            ); //"Remove the item whose productId matches"

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

    // Update quantity of a product
    async updateCartItem(userId, productId, quantity) {
        try {
            const cart = await CartModel.findOne({ user: userId });
            if (!cart) throw new Error("Cart not found");

            const itemIndex = cart.items.findIndex(
                item => item.productId.toString() === productId
            );

            if (itemIndex === -1) throw new Error("Product not in cart");

            // Update quantity
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

    // Clear entire cart
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