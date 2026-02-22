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

categoryRouter.post('/create-category',validator(categoryDTO), categoryCtrl.createCategory)
categoryRouter.get('/get-data', categoryCtrl.listAllCategory)
// categoryRouter.get('/:blogId')







module.exports = categoryRouter