const { object } = require("joi")
const OrderModel = require("../models/order.model")
const ProductModel = require("../models/product.model")
const { OrderStatus } = require("../utilities/constants")

class OrderService{
    async createOrder(userId, products){
        
        try {
            if (!products || products.length === 0) {
                throw{code:400, message:"Products Cannot be Empty", status:"EMPTY_PRODUCT_ERR"}
            }

            //extract product Ids
            const productIds = products.map(item  => item.productId)

            //fetch all products
            const productDetails = await ProductModel.find({
                _id:{$in:productIds}
            })

            //checking any product is missing
            if (productDetails.length !== productIds.length) {
                throw { code: 404, message: "One or more products not found", status: "PRODUCT_NOT_FOUND" }
            }

            let totalPrice = 0
            let orderProducts = []

            //validating stock and calculating total
            for (let items of products){

                const product = productDetails.find(
                p => p._id.toString() === items.productId
                )

                if(!product){
                    throw{code:404, message:"Product not found", status:"NOT_FOUND_ERR"}
                }

                if(product.stockQuantity<items.quantity){
                    throw{code:400, message:`Insufficient stock for ${product.name}`, status:"INSUFFICIENT_STOCK"}
                }
                totalPrice+=product.price*items.quantity
                orderProducts.push({
                    productId:product._id,
                    quantity:items.quantity,
                    price:product.price
                })
            }

            //reducing stock
            for(let items of products){
                const product = productDetails.find(
                    p=> p._id.toString() === items.productId
                )

                product.stockQuantity -= items.quantity
                await product.save()
            }

            const order = await OrderModel.create({
                user:userId,
                products: orderProducts,
                totalPrice
            })

            return order



            
        } catch (exception) {
            throw exception
        }
    }

    async getUserOrder(filter = {}){
        try {
            const order = await OrderModel.find(filter)
            .populate("products.productId")
            .populate("user")
            .sort({createdAt: "desc"})
            return order
            
        } catch (exception) {
            throw exception
            
        }

    }
    async getAllOrder(filter = {}){
        try {
            if(filter.status) filter.status = filter.status
            if(filter.userId) filter.user = filter.userId
            const order = await OrderModel.find(filter)
            .populate("products.productId")
            .populate("user")
            .sort({createdAt: "desc"})
            return order
            
        } catch (exception) {
            throw exception
            
        }

    }
    async updateOrder(orderId, newStatus){
        try {
            if (!Object.values(OrderStatus).includes(newStatus)) {
                throw{
                    code:404,
                    message:"Invalid Status",
                    status:"INVALID_STATUS"
                }
            }

            const order = await OrderModel.findById(orderId)
            if (!order) {
                throw{
                    code:404,
                    message:"order not found",
                    status:"ORDER_NOT_FOUND"
                }
            }
            if (order.status === OrderStatus.COMPLETED) {
                throw{
                    code:400,
                    message:"Delivered order cannot be modified",
                    status:"ORDER_ALREADY_DELIVERED"
                }
            }
            if (order.status === OrderStatus.CANCELLED) {
                throw{
                    code:400,
                    message:"Cancelled order cannot be modified",
                    status:"ORDER_ALREADY_CANCELLED"
                }
            }
            if (newStatus === OrderStatus.CANGELLED) {
                for(let items of order.products){
                    const product = await ProductModel.findById(items.productId)
                    if (product) {
                        product.stockQuantity += items.stockQuantity
                        await product.save()
                    }
                }
            }
            order.status = newStatus
            await order.save()

            const updatedOrder = await OrderModel.findById(order._id)
            .populate("user")
            .populate("products.productId")

            return updatedOrder

            

            
        } catch (exception) {
            throw exception
        }
    }
    async deleteOrder(){
        
    }




}

module.exports = new OrderService()