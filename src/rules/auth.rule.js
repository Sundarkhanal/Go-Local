const Joi = require("joi");




const RegisterDTO = Joi.object({
    name: Joi.string().min(2).max(30).required().messages(),
    email:Joi.string().email().required(),
    phone:Joi.string().required().min(10).max(21).optional().allow(null, '').default(null),
    password:Joi.string().min(8).max(15).required(),
    confirmPassword:Joi.ref('password'),
    role: Joi.string().allow("customer", "admin").default("customer"),
    address:Joi.string(),
    gender:Joi.string().allow("male", "female", "others").required(),
    image:Joi.string().allow(null, '').default(null)
})

module.exports = RegisterDTO