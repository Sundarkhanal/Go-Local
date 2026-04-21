const Joi = require("joi");


const RolePattern = /^(customer|admin)$/
const GenderPattern = /^(male|female|other)$/
const PasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[\w]).{8,25}$/   

const RegisterDTO = Joi.object({
    name: Joi.string().min(2).max(30).required().messages(),
    email:Joi.string().email().required(),
    phone:Joi.string().required().min(10).max(21).optional().allow(null, '').default(null),
    password:Joi.string().regex(PasswordPattern) .required().messages({
        "any.required":"Password is Compulsory",
        "string.pattern.base":"Password must have one lowercase character, 1 Uppercase Character, 1 Number and 1 Special Characters"
    }),
    confirmPassword:Joi.string().valid(Joi.ref("password")).messages({
        "any.only":"Password and confirm password must be match"
    }).required(),
    role: Joi.string().regex(RolePattern).default("customer").messages({
        "string.pattern.base": "Role should be either seller or customer"
    }),
    address:Joi.string(),
    gender:Joi.string().regex(GenderPattern).required().messages({
        "string.pattern.base": "Gender should be either male, female or others"
    }),
    image: Joi.string().allow("", null).default("")
})

const OTPVerifyDTO = Joi.object({
    email: Joi.string().email().required(),
    otp:Joi.string().required()
})

const LoginDTO = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required()
})

module.exports = {RegisterDTO, OTPVerifyDTO, LoginDTO}