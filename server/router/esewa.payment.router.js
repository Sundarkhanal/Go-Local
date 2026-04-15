const epaymentRouter = require("express").Router()
const checkPermission = require("../../server/middleware/auth.middleware")
const paymentCtrl = require("../../server/controller/esewa.payment.controller")

epaymentRouter.post('/initiate', checkPermission(), paymentCtrl.initiatePayment)
epaymentRouter.get('/success', checkPermission(), paymentCtrl.paymentSuccess)
epaymentRouter.get('/failure', checkPermission(), )




module.exports = epaymentRouter