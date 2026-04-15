const  slugify  = require("slugify")

const ProductModel = require("../models/product.model")
const CategoryModel = require("../models/category.model")


class ProductService{
    async store(data){
        try {
            const{name,description, category, price, stockQuantity, images} = data
            const new_category = await CategoryModel.findById(data.category)

            if (!new_category) {
                throw{code:404, message:"Category not Found", status:"NOT_FOUND_ERR"}
            }
            data.slug = slugify(data.name, {
                strict:true,
                lower:true,
                remove:/[*+~.()'"!:@]/g
            })
            const products = new ProductModel({
                name:data.name,
                slug:data.slug,
                description:data.description,
                category:data.category,
                price:data.price,
                stockQuantity:data.stockQuantity,
                images:data.images
            })
            return await products.save()

            
        } catch (exception) {
            throw exception
        }
    }
    
    async listAll({filter={}, limit = 10, page = 1}){
        try {
            const data = await ProductModel.find(filter)
            .populate("category", "name slug")
            .limit(limit)
            .skip((page-1)*limit)
            .sort({createdAt:"desc"})

            const totalcount = await ProductModel.countDocuments(filter)

            return{
                data, count:totalcount
            }
        } catch (exception) {
            throw exception
        }
    }

    async getSingleProduct(filter){
        try {
            const data = await ProductModel.findOne(filter)
            return data
            
        } catch (exception) {
            throw exception
            
        }
    }
    async updateSingleProduct(filter, updateData){
        try {
            if (updateData.name) {
                updateData.slug = slugify(updateData.name, {
                    lower:true,
                    strict:true,
                    remove:/[*+~.()'"!:@]/g
                })
                
            }
            const data = await ProductModel.findOneAndUpdate(filter, {$set:updateData}, {new:true})
            return data
            
            
        } catch (exception) {
            throw exception
        }
    }

    async deleteSingleProduct(filter){
        try {
            const data = await ProductModel.findOneAndDelete(filter)
            return data
            
        } catch (exception) {
            throw exception
            
        }

    }
}

module.exports = new ProductService()