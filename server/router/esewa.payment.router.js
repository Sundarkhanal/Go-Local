const epaymentRouter = require("express").Router()
const checkPermission = require("../middleware/auth.middleware")
const paymentCtrl = require("../controller/esewa.payment.controller")

epaymentRouter.post('/initiate', checkPermission(), paymentCtrl.initiatePayment)
epaymentRouter.get('/success', checkPermission(), paymentCtrl.paymentSuccess)
epaymentRouter.get('/failure', checkPermission(), paymentCtrl.paymentFailed)




module.exports = epaymentRouter