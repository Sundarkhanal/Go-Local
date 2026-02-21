const { default: slugify } = require("slugify")
const CategoryModel = require("../models/category.model")

class CategoryService{
    async store(data){
        try {
            const {name, description, parent} = data
            if (!name) {
                throw new Error("Category name is required")
            }
            data.slug = slugify(data.name, {
                lower:true,
                strict:true,
                remove:/[*+~.()'"!:@]/g
            })

            const category = new CategoryModel(name, description, parent, slug)
            await category.save()
            return category
        } catch (exception) {
            throw exception
            
        }
    }
}

module.exports = new CategoryService()