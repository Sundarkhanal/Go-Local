const { date } = require("joi")
const cartService = require("./cart.service")

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

            const transactionId = userCart._id + Date.now()
            const payload = {
                amount:totalPrice,
                transaction_uuid: transactionId,
                success_url:"http://localhost:9005/payment/success",
                failure_url:"http://localhost:9005/payment/failed"
            }
            return payload
            
        } catch (exception) {
            throw exception
        }
    }

}

module.exports = new EPaymentService()