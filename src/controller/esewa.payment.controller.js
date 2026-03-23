const cartService = require("../services/cart.service")
const esewaPaymentService = require("../services/esewa.payment.service")

class PaymentController{
    initiatePayment = async(req, res, next) => {
        try {
            const userId = req.loggedInUser._id

            const paidUser = await esewaPaymentService(userId)

            res.json({
                data:paidUser,
                message:"Payment Started",
                status:"Ok"
            })
            
        } catch (exception) {
            next(exception)
        }
    }
}

module.exports =  new PaymentController()