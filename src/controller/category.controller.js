const { default: slugify } = require("slugify");
const categoryService = require("../services/category.service");

class CategoryController{
    createCategory = async(req, res, next) =>{
        try {
            const {name, description, parent} = req.body;
            const category = await categoryService.store(name, description, parent)
            res.json({
                data:category,
                message:"Category Created Successfully",
                status:"Ok"
            })
        } catch (exception) {
            next(exception)
        }


    }


}

module.exports = new CategoryController()