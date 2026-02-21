const authRouter = require("./auth.router")
const categoryRouter = require("./category.router")

const router = require("express").Router()

router.use('/auth', authRouter)
router.use('/category', categoryRouter)


module.exports = router