const orderRouter = require("express").Router()
const checkpermission = require("../middleware/auth.middleware")
const orderCtrl = require("../controller/order.controller")

orderRouter.post('/create-order',checkpermission(), orderCtrl.createOrder )
orderRouter.get('/all-user-orders',checkpermission(), orderCtrl.readUserOrder)
orderRouter.get('/all-orders',checkpermission(), orderCtrl.readAllOrder)
orderRouter.post('/update-orders', checkpermission(), orderCtrl.updateOrder)




module.exports = orderRouter