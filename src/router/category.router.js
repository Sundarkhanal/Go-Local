const categoryRouter = require("express").Router()
const Joi = require("joi")
const categoryCtrl = require("../controller/category.controller")
const { GeneralStatus, UserRoles } = require("../utilities/constants")
const validator = require("../middleware/validator.middleware")
const checkpermission = require("../middleware/auth.middleware")


const categoryDTO = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    description: Joi.string().required(),
    parent: Joi.string().optional().allow(null),
    status:Joi.string().regex(/^(active|inactive)$/).default(GeneralStatus.INACTIVE)
})

categoryRouter.post('/create-category',checkpermission(),validator(categoryDTO), categoryCtrl.createCategory)  //todo check permission 
categoryRouter.get('/get-data', categoryCtrl.listAllCategory)
categoryRouter.get('/:blogId', categoryCtrl.getCategoryById)
categoryRouter.get('/by-slug/:slug', categoryCtrl.getcategoryBySlug)
categoryRouter.put('/:blogId',checkpermission(), validator(categoryDTO), categoryCtrl.updatecategoryById) // todo check permission







module.exports = categoryRouter