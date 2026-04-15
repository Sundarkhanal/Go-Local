const { date } = require("joi")
const cartService = require("./cart.service")
const Payment = require("../models/esewa.payment.model")
const { generateEsewaSignature } = require("../utilities/helper")
const Order = require("../models/order.model")

class EPaymentService{
    async initiatePayment(userId){
        try {
            const userCart = await cartService.getCart(userId)
            if (!userCart) {
                throw{
                    code:404,
                    message:"User's Cart Not Found",
                    status:'NOT_FOUND_ERR'
                }
            }
            const totalPrice = userCart.items.reduce(
                (total, item) => total + item.quantity * item.price, 0
            )

            const transactionId = `${userCart._id}-${Date.now()}`
            await Payment.create({
                transactionId: transactionId,
                amount:totalPrice,
                status:"pending"
            })
            const payload = {
                amount:totalPrice,
                tax_amount: 0,
                total_amount:totalPrice,
                transaction_uuid: transactionId,
                product_code: process.env.ESEWA_PRODUCT_CODE,
                success_url:"http://localhost:9005/payment/success",
                failure_url:"http://localhost:9005/payment/failed"
            }

            payload.signature = generateEsewaSignature(payload)
            return payload
            
        } catch (exception) {
            throw exception
        }
    }

    async successPayment(encodedData){
        try {
          if(!encodedData){
            throw{
                code:404,
                message:"No Payment Data Received",
                status:"NOT_FOUND_ERR"
            }
          }
          const decodedString = Buffer.from(encodedData, "base64").toString("utf-8")
          const paymentData = JSON.parse(decodedString)

          if(paymentData.status !== "COMPLETE"){
            throw{
                code: 400,
                message:"Payment Failed",
                status:"PAYMENT_FAILED_ERR"
            }
          }
          const payment = await Payment.findOne({
            transactionId:paymentData.transaction_uuid
          })
          if(!payment){
            throw{
                code:404,
                message:"Payment Not Found",
                status:"NOT_FOUND_ERR"
            }
          }
          payment.status = "success"
          payment.esewaResponse = paymentData
          await payment.save()

          const order = await Order.findById(payment.order)
          if(order){
            order.status = "completed"
            await order.save()
          }

          return{
            transactionId: paymentData.transaction_uuid

          }
            
        } catch (exception) {
            throw exception
        }
    }

}

module.exports = new EPaymentService()