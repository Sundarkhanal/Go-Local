const authRouter = require("./auth.router")
const categoryRouter = require("./category.router")
const productRouter = require("./product.router")

const router = require("express").Router()

router.use('/auth', authRouter)
router.use('/category', categoryRouter)
router.use('/products', productRouter)


module.exports = router