const orderService = require("../services/order.service")

class OrderController{
    createOrder = async(req, res, next) =>{
        try {
            const userId = req.loggedInUser._id
            const {products }= req.body

            const order = await orderService.createOrder(userId, products)
            res.json({
                data:order,
                message:"Order created succesfully",
                status:"Ok"
            })

            
        } catch (exception) {
            next(exception)
            
        }

    }
    readOrder = async(req, res, next) =>{
        try {
            
        } catch (exception) {
            
        }

    }
    updateOrder = async(req, res, next) =>{
        try {
            
        } catch (exception) {
            
        }

    }
    deleteeOrder = async(req, res, next) =>{
        try {
            
        } catch (exception) {
            
        }

    }
    
}
module.exports = new OrderController()