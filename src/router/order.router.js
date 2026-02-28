const orderRouter = require("express").Router()
const checkpermission = require("../middleware/auth.middleware")
const orderCtrl = require("../controller/order.controller")

orderRouter.post('/create-order',checkpermission(), orderCtrl.createOrder )




module.exports = orderRouter