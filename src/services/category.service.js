const { default: slugify } = require("slugify")
const CategoryModel = require("../models/category.model")

class CategoryService{
    async store(data){
        try {
            const {name, description, parent} = data
            
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
}

module.exports = new CategoryService()