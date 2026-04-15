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
            let page = +query.page || 1   // +is for numeric conversion => data comes in string and it converts to number
            let limit = +query.limit || 20

            if(query.search){
                filter={
                    $or: [
                        {name: new RegExp(query.search, 'i')},   // i for case insensitive
                        {description: new RegExp(query.search, 'i')}
                    ]
                }
            }

            if(query.status){
                filter = {
                    ...filter, //using spread operator to merge existing filter with new status filter
                    status:query.status
                }
            }

            if (query.parent) {
                filter = {
                    ...filter,
                    parent:query.parent
                
            }}

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

    getCategoryById = async (req, res, next) => {
        try {
            const id = req.params.blogId
            let filter = {
                _id: id
            }
            if(req.query.status){
                filter={
                    ...filter,
                    status:req.query.status
                }
            }
            const data = await categoryService.getSingleRow(filter)
            if (!data) {
                throw{code:404, message:"Category Not Found", status:"CATEGORY_NOT_FOUND_ERR"}
                
            }
            res.json({
                data:data,
                message:"Category Detail",
                status:"OK"
            })
            
        } catch (exception) {
            next(exception)
        }
    }

    getcategoryBySlug = async (req, res, next) => {
        try {
            const slug = req.params.slug
            let filter = {
                slug: slug
            }
            if(req.query.status){
                filter={
                    ...filter,
                    status:req.query.status
                }
            }
            const data = await categoryService.getSingleRow(filter)
            if (!data) {
                throw{code:404, message:"Category Not Found", status:"CATEGORY_NOT_FOUND_ERR"}
                
            }
            res.json({
                data:data,
                message:"Category Detail",
                status:"OK"
            })
            
        } catch (exception) {
            next(exception)
        }
    }

    updatecategoryById = async (req, res, next) => {
        try {
            const id = req.params.blogId
            let filter = {
                _id:id
            }
            const detail = await categoryService.getSingleRow(filter)
            
            if (!detail) {
                throw {code: 404,  message:"Category Not Found", status:"NOT_FOUND_ERR"}
            }
            const data = req.body

            const response = await categoryService.updateSingleRow(filter, data)  
        
            
            res.json({
                data:response,
                message:"Category updated succesfully",
                status:"OK"
            })
            
        } catch (exception) {
            next(exception)
        }
    }

    deleteCategoryById = async(req, res, next) => {
        try {
            const id = req.params.blogId;
            let filter = {
                _id: id
            }
            const detail = await categoryService.getSingleRow(filter)
            if (!detail) {
                throw {code:404, message:"Category Not Found", status:"NOT_FOUND_ERR"}
            }

            const del = await categoryService.deleteSingleRow(detail)
            res.json({
                data:null,
                message:"Category Deleted Succesfully",
                status:"Ok"
            })
            
        } catch (exception) {
            next(exception)
            
        }
    }
}





module.exports = new CategoryController()


