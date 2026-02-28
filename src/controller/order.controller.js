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
    readUserOrder = async(req, res, next) =>{
        try {
            const userId = req.loggedInUser._id
            let filter = {
                user:userId
            
            }

            const orders = await orderService.getUserOrder(filter)
            res.json({
                data:orders,
                message:"All users order",
                status:"Ok"
            })
            
        } catch (exception) {
            next(exception)
        }

    }
    readAllOrder = async(req, res, next) =>{
        try {
            let filters = {
                status: req.query.status,
                userId: req.query.userId
            }
            

            const orders = await orderService.getAllOrder(filters)
            res.json({
                data:orders,
                message:"All users order",
                status:"Ok"
            })
            
        } catch (exception) {
            next(exception)
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