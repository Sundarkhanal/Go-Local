const categoryRouter = require("express").Router()
const Joi = require("joi")
const categoryCtrl = require("../controller/category.controller")
const { GeneralStatus, UserRoles } = require("../utilities/constants")
const validator = require("../middleware/validator.middleware")
const checkpermission = require("../middleware/auth.middleware")


const categoryDTO = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    description: Joi.string().required(),
    parent: Joi.string().required(),
    status:Joi.string().regex(/^(active|inactive)$/).default(GeneralStatus.INACTIVE)
})

categoryRouter.post('/create-category',checkpermission([UserRoles.ADMIN]),validator(categoryDTO), categoryCtrl.createCategory)






module.exports = categoryRouter