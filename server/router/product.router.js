const productRouter = require("express").Router()
const Joi = require("joi")
const productCtrl = require("../controller/product.controller")
const checkpermission = require("../middleware/auth.middleware")
const validator = require("../middleware/validator.middleware")
const uploader = require("../middleware/uploader.middleware")

const ProductDTO = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    description: Joi.string().required(),
    category:Joi.string().required(),
    price:Joi.number().positive().required().messages({
        'number.base': 'price must be a number'
    }),
    stockQuantity:Joi.number().min(0).required(),

})
const ProductUpdateDTO = Joi.object({
    name: Joi.string().min(2).max(30).optional(),
    description: Joi.string().optional(),
    category:Joi.string().optional(),
    price:Joi.number().positive().optional().messages({
        'number.base': 'price must be a number'
    }),
    stockQuantity:Joi.number().min(0).optional(),
    images:Joi.string().optional()

})

productRouter.post('/create-product',checkpermission(), uploader().single("images"),validator(ProductDTO) ,productCtrl.createProduct)
productRouter.get('/all-products', productCtrl.listAllProduct)
productRouter.get('/:pid', productCtrl.getProductById)
productRouter.put('/:uid',checkpermission(),uploader().single("images"),  validator(ProductUpdateDTO),productCtrl.updateProductById)
productRouter.delete('/:did', checkpermission(), productCtrl.deleteProductById)

module.exports = productRouter