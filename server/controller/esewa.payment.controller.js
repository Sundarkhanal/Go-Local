const cartService = require("../services/cart.service")
const EPaymentService = require("../services/esewa.payment.service")

class PaymentController{
    initiatePayment = async(req, res, next) => {
        try {
            const userId = req.loggedInUser._id
            console.log(userId);
            

            const paidUser = await EPaymentService.initiatePayment(userId)

            res.json({
                paymentUrl: paidUser.paymentUrl,
                data:paidUser,
                message:"Payment Started",
                status:"Ok"
            })
            
        } catch (exception) {
            next(exception)
        }
    }
    paymentSuccess = async(req, res, next) =>{
        try {
            const data = req.query.data
            const result = await EPaymentService.successPayment(data)

            res.json({
                data: result,
                message:"Payment Successfull",
                status:"Ok"
            })

        } catch (exception) {
            next(exception)
        }
    }

    paymentFailed = async(req, res, next)=> {
        try {
            const data = req.query.data;
            const failedResult = await EPaymentService.failedPayment(data)

            res.json({
                data:failedResult,
                message:"Payment Failed",
                status:"Failed"
            })
            
        } catch (exception) {
            next(exception)
        }
    }
}

module.exports =  new PaymentController()