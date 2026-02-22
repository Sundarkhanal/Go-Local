const { default: slugify } = require("slugify");
const categoryService = require("../services/category.service");

class CategoryController{
    createCategory = async(req, res, next) =>{
        try {
            const {name, description, parent} = req.body;

            const category = await categoryService.store({name, description, parent})
            res.json({
                data:category,
                message:"Category Created Successfully",
                status:"Ok"
            })
        } catch (exception) {
            next(exception)
        }


    }

    listAllCategory = async(req, res, next) => {
        try {
            const query = req.query

            let filter = {}
            let page = +query.page || 1
            let limit = +query.limit || 20

            if(query.search){
                filter={
                    $or: [
                        {name: new RegExp(query.search, 'i')},
                        {description: new RegExp(query.search, 'i')}
                    ]
                }
            }

            if(query.status){
                filter = {
                    ...filter,
                    status:query.status
                }
            }

            const {data, count} = await categoryService.listAll({filter, page, limit}) //req.query for getting limit and page
            res.json({
                data: data,
                message:"All categories fetched successfully!",
                status:"Ok",
                pagination:{
                    total:count,
                    page:page,
                    limit:limit
                }
            })
        } catch (exception) {
            next(exception)
        }
        
    }
    




}

module.exports = new CategoryController()