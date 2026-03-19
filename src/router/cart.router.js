const cartRouter = require("express").Router()
const checkpermission = require("../middleware/auth.middleware")
const cartCtrl = require("../controller/cart.controller")
cartRouter.post('/add', checkpermission(), cartCtrl.addToCart)
cartRouter.get('/get-cart', checkpermission(), cartCtrl.getCart)
cartRouter.put('/update/:productId', checkpermission(), cartCtrl.updateCartItem)
cartRouter.delete('/remove/:productId', checkpermission(), cartCtrl.removeCartItem)
cartRouter.delete('/clear', checkpermission(), cartCtrl.clearCart)





module.exports = cartRouter

