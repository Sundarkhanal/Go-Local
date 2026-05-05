const authRouter = require("./auth.router")
const cartRouter = require("./cart.router")
const categoryRouter = require("./category.router")
const chatRouter = require("./chat.router")
const epaymentRouter = require("./esewa.payment.router")
const orderRouter = require("./order.router")
const productRouter = require("./product.router")

const router = require("express").Router()

router.use('/auth', authRouter)
router.use('/category', categoryRouter)
router.use('/products', productRouter)
router.use('/orders', orderRouter)
router.use('/cart', cartRouter)
router.use('/payment', epaymentRouter)
router.use('/chat', chatRouter )


module.exports = router