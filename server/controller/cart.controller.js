const CartService = require("../services/cart.service");

class CartController {
    // Add product to cart
    async addToCart(req, res, next) {
        try {
            const userId = req.loggedInUser._id// from auth middleware  
            
            
            const { productId, quantity } = req.body;
            console.log(productId);
            console.log(quantity);

            const cart = await CartService.addToCart(userId, productId, quantity);

            res.status(200).json({
                data: cart,
                message: "Product added to cart",
                status:"Ok"
            });
        } catch (exception) {
            next(exception)

        }
    }

    // Get user's cart
    async getCart(req, res, next) {
        try {
            const userId = req.loggedInUser._id;
            const cart = await CartService.getCart(userId);

            res.status(200).json({
                data: cart,
                message: "Cart fetched successfully",
                status:"Ok"
            });
        } catch (exception) {
            next(exception)
        }
    }

    // Remove product from cart
    async removeCartItem(req, res, next) {
        try {
            const userId = req.loggedInUser._id;
            const { productId } = req.params;

            const cart = await CartService.removeCartItem(userId, productId);

            res.status(200).json({
                data: cart,
                message: "Product removed from cart",
                status:"Ok"
            });
        } catch (exception) {
            next(exception)
        }
    }

    // Update product quantity
    async updateCartItem(req, res,next) {
        try {
            const userId = req.loggedInUser._id;
            const { productId } = req.params;
            
            const { quantity } = req.body;

            const cart = await CartService.updateCartItem(userId, productId, quantity);

            res.status(200).json({
                data: cart,
                message: "Cart updated successfully",
                status:"Ok"
            });
        } catch (exception) {
            next(exception)
        }
    }

    // Clear cart
    async clearCart(req, res, next) {
        try {
            const userId = req.loggedInUser._id;
            const cart = await CartService.clearCart(userId);

            res.status(200).json({
                data: cart,
                message: "Cart cleared successfully",
                status:"Ok"
            });
        } catch (exception) {
            next(exception)
        }
    }
}

module.exports = new CartController();