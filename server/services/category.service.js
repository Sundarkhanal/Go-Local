const { default: slugify } = require("slugify")
const CategoryModel = require("../models/category.model")

class CategoryService{
    async store(data){
        try {
            const {name, description, parent} = data

            if(parent){
                const parentCategory = await CategoryModel.findById(parent)
                if(!parentCategory){
                    throw{
                        code:400,
                        message:"Parent Category not found",
                        status:"NOT_FOUND_ERR"
                    }
                }
            }
            
            data.slug = slugify(data.name, {
                lower:true,
                strict:true,
                remove:/[*+~.()'"!:@]/g
            })

            const category = new CategoryModel({name:data.name, description:data.description, parent:data.parent, slug:data.slug})
            return await category.save()
        } catch (exception) {
            throw exception
            
        }
    }

    async listAll({filter = {},limit = 10, page = 1}){
        try {
            //fetch all data
            const data = await CategoryModel.find(filter)
            .populate("parent", "name")
            .limit(limit)
            .skip(((page-1)* limit))
            .sort({createdAt: "desc"}); //newest first

            const totalcount = await CategoryModel.countDocuments(filter)

            return {data, count:totalcount}
        } catch (exception) {
            throw exception
        }
    }

    async getSingleRow(filter){
        try {
            const data = await CategoryModel.findOne(filter)
            return data;    
        } catch (exception) {
            throw exception
        }
    }

    async updateSingleRow(filter, updateData){
        try {

            if(updateData.name){
                updateData.slug = slugify(updateData.name, {
                    lower:true,
                    strict:true,
                    remove:/[*+~.()'"!:@]/g
                })

            }

            const data = await CategoryModel.findOneAndUpdate(filter, {$set: updateData}, {new:true}) //find, update, returns updated data
            return data
        } catch (exception) {
            throw exception
        }
    }

    async deleteSingleRow(filter){
        try {
            const data = await CategoryModel.findOneAndDelete(filter)
            return data
            
        } catch (exception) {
            throw exception
        }
    }
}



module.exports = new CategoryService()