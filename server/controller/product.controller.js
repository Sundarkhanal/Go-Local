const productService = require("../services/product.service");
const ProductService = require("../services/product.service")

class ProductController{
    createProduct = async(req, res, next)=>{
        try {
            if (!req.file) {
            return res.status(400).json({
                error: { images: "Image is required" },
                message: "Validation Failed",
                status: "VALIDATION_FAILED_ERR"
            });
        }
            const data = req.body
            data.images = data.images = req.file.path || `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${req.file.filename}`
            

            const product = await ProductService.store(data)

            res.json({
                data:product,
                message:"Product created successfully",
                status:"OK"
            })
            
        } catch (exception) {
            next(exception)
            
        }

    }

    listAllProduct = async(req, res, next) =>{
        try {
            const query = req.query

            let filter = {}
            let limit = +query.limit || 8
            let page = +query.page || 1

            if(query.search){
                filter ={
                    $or:[
                        {name: new RegExp(query.search, 'i')},
                        {description: new RegExp(query.description, 'i')}
                    ]
                }
            }
            if(query.status){
                filter = {
                    ...filter,
                    status:query.status
                }
            }
            if (query.category) {
                filter = {
                    ...filter,
                    category:query.category
                }
            }
            //todo filter by price

            const {data, count } = await productService.listAll({filter,limit, page})
            res.json({
                data:data,
                message:"All products list",
                status:"Ok",
                meta:{
                    total:count,
                    page:page,
                    limit:limit,
                    totalPages: Math.ceil(count/limit)
                }
            })
            
        } catch (exception) {
            next(exception)
        }
    }

    getProductById = async(req, res, next) =>{
        try {
            const id = req.params.pid
            let filter = {
                _id :id
            }
            if(req.query.status){
                filter = {
                    ...filter,
                    status:req.query.status
                }
            }
            const product = await productService.getSingleProduct(filter)
            if (!product) {
                throw{code:404, message:"Product Not Found", status:"NOT_FOUND_ERR"}
                
            }

            res.json({
                data:product,
                message:"Product Details",
                status:"Ok"
            })

            
        } catch (exception) {
            next(exception)
            
        }
    }
    
    updateProductById = async(req, res, next) =>{
        try {
            const id = req.params.uid
            let filter = {
                _id:id
            }
            const productDetail = await productService.getSingleProduct(filter)
            if (!productDetail) {
                throw{code:404, message:"Product Not Found", status:"NOT_FOUND_ERR"}
            }
            const data = req.body

            const updatedProduct = await productService.updateSingleProduct(filter, data)

            res.json({
                data:updatedProduct,
                message:"Product Updated Succesfully!!",
                status:"OK"
            })
            
        } catch (exception) {
            next(exception)
            
        }

    }

    deleteProductById = async(req, res, next) =>{
        try {
            const id = req.params.did
            let filter = {
                _id:id
            }
            const detail = await productService.getSingleProduct(filter)
            if (!detail) {
                throw{code:404, message:"Product Not Found", status:"NOT_FOUND_ERR"}
            }
            const del = await productService.deleteSingleProduct(filter)

            res.json({
                data:null,
                message:"Product Deleted Successfully!!",
                status:"OK"
            })

            
        } catch (exception) {
            next(exception)
        }
    }


}

module.exports = new ProductController()