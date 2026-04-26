const { date } = require("joi")
const cartService = require("./cart.service")
const Payment = require("../models/esewa.payment.model")
const { generateEsewaSignature } = require("../utilities/helper")
const OrderModel = require("../models/order.model")
const crypto = require("crypto")


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

            const transactionId = crypto.randomUUID()
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
            
            const esewaUrl = `${process.env.ESEWA_GATEWAY_URL}/api/epay/main/v2/form`
            return{
                paymentUrl: esewaUrl,
                payload
                
            } 
            
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

          const order = await OrderModel.findById(payment.order)
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

    async failedPayment(encodedData){
        try {
            if(!encodedData){
                throw{
                    code:400,
                    message:"No Payment Data Received",
                    status:"NOT_FOUND_ERR"
                }
            }

            const decodedString = Buffer.from(encodedData, "base64").toString("utf-8")
            const paymentData = JSON.parse(decodedString)

            const payment = await Payment.findOne({
                transactionId:paymentData.transaction_uuid
            })
            if(!payment){
                throw{
                    code:404,
                    message:"No Payment Found",
                    status:"NOT_FOUND_ERR"
                }
            }
            if (paymentData.status === "COMPLETE") {
            throw {
                code: 400,
                message: "This is not a failed payment",
            };
            }
            payment.status = "failed";
            payment.esewaResponse = paymentData
            await payment.save()

            const order = await OrderModel.findById(payment.order)
            if (order) {
                order.status = "cancelled"
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