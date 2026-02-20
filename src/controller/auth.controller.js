const mailservice = require("../services/email.service")
const { createUser } = require("../services/user.service");
const userService = require("../services/user.service");
const { randomStringGenerater } = require("../utilities/helper");
const emailService = require("../services/email.service");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const { appConfing } = require("../config/config");
class AuthController{

    #userDetail
    
    async #validateUserExistsByEmail(email){
            this.#userDetail = await userService.getSingleUserProfile({
                email:email
            })

            if (!this.#userDetail) {
                throw{code: 400, details:{email:"Email Not Registered yet..."}, message:"User not found", status:"USER_NOT_FOUND_ERR"}
            }

    }


    register = async(req, res, next) =>{
        try {
            const data = userService.transformData(req)

            const user = await userService.createUser(data)
            await mailservice.sendEmail({
                to: user.email,
                subject: "Activate your account",
                message: userService.getActivateYourAccountMessage({name:user.name, otp:data.otp})
            })


                res.json({
                data: userService.getPublicUserProfile(user),
                message:"User registered successfully",
                status: "Ok"
            })

            }catch (exception) {
                next(exception)
            }
    }

    activateUser = async (req, res, next) => {
        try {
            const{email, otp} = req.body;
            const userDetail = await userService.getSingleUserProfile({
                email: email,
                otp: otp

            })

            if (!userDetail) {
                throw{code:404, message:"User not Found", status:"USER_NOT_FOUND_ERR"}
                
            }
            if (userDetail.otp !== otp) {
                throw{code:400, details: {otp:"OTP code not found"}, message:"Incorrect OTP Code", status:"INCORRECT_OTP_ERR"}
            }
            const otpExpiryTime = userDetail.expiryTime.getTime() //provides timestamps
            const currentTime = Date.now();

            if (otpExpiryTime < currentTime) {
                throw{code:400, details: {otp:"OTP Expired"}, message:"OTP Expired", status:"OTP_EXPIRED_ERR"}
            }

            const update = await userService.updateSingleProfile({
                _id: userDetail._id
            }, {
                otp:null,
                expiryTime:null,
                status:"active"
            })

            res.json({
                data: userService.getPublicUserProfile(update),
                message:"User Activated Successfully",
                status:"ok"
            })

        } catch (exception) {
            next(exception)
            
        }

    }

    resendActivationOTP = async(req, res, next) => {

        try {
            const {email} = req.body;
            
            const userDetail = await userService.getSingleUserProfile({
                email: email,
    

            })
            

            if (!userDetail) {
                throw{code:404, message:"User not Found", status:"USER_NOT_FOUND_ERR"}
                
            }
            // if (userDetail.otp !== otp) {
            //     throw{code:400, details: {otp:"OTP code not found"}, message:"Incorrect OTP Code", status:"INCORRECT_OTP_ERR"}
            // }
            const otpExpiryTime = userDetail.expiryTime.getTime() //provides timestamps
            const currentTime = Date.now();

            if (otpExpiryTime >= currentTime) {
                throw{code:400, details: {otp:"OTP Not Expired"}, message:"OTP Not Expired", status:"OTP_EXPIRED_ERR"}
            }

            const data =  {
                otp:randomStringGenerater(6),
                expiryTime: new Date(Date.now()+6000),
            }

            const update = await userService.updateSingleProfile({
                _id: userDetail._id
            }, data);

            await emailService.sendEmail({
                to:userDetail.email,
                subject:"Re-OTP-Code",
                message:userService.getResendActivationOTP({name: userDetail.name, otp: data.otp})
            })

            res.json({
                data: userService.getPublicUserProfile(update),
                message:"An email has been sent to your registered Account",
                status:"ok"
            })



        } catch (exception) {
            next(exception)
            
        }

    }

   

    login = async(req, res, next) => {
        try {
            const {email, password} = req.body;
            await this.#validateUserExistsByEmail(email)

            if (!this.#userDetail.status === 'inactive') {
                throw{code:422, message:"User not Activated yet...", status:"USER_NOT_ACTIVATED_ERR"}
                
            }

            if (!bcrypt.compareSync(password, this.#userDetail.password)) {
                throw{code: 422, message:"Credintials doesnot match", status:"INVALID_CREDINTIALS-ERR"}
            }
            
            const token = jwt.sign({sub: this.#userDetail._id}, appConfing.jwtSecret, {expiresIn:"1d"})
            res.cookie("Authorization", "Bearer"+token, {maxAge: 600000, httpOnly: true})

            res.json({
                data: token,
                message:"You are loggedIn",
                status:"OK"
            })



        } catch (exception) {
            next(exception)
            
        }
        
    }

    getLoggedInUser = (req,res, next) => {
        res.json({
            data: req.loggedInUser,
            message:"Your Details",
            status:"Ok"
        })

        
    }

    forgetPassword = async(req, res, next) => {
        try {
            const {email} = req. body
            await this.#validateUserExistsByEmail(email)

            const resetToken = randomStringGenerater(6).toUpperCase()
            const expiryTime = new Date(Date.now()+15*60*6000)

            await userService.updateSingleProfile({_id: this.#userDetail._id}, {
                passwordResetToken: resetToken,
                passwordResetExpiry: expiryTime
            })

            await emailService.sendEmail({
                to:this.#userDetail.email,
                subject:"Reset Your Password",
                message:userService.getResetPasswordMessage({
                    name:this.#userDetail.name,
                    resetLink:`http://localhost:9005/ap1/v1/reset-password?token = ${resetToken}`
                })
            })
            res.json({
                message:"An Email has been sent to your account",
                status:"OK"
            })

            
        } catch (exception) {
            next(exception)
        }
    }

    resetPassword = async(req, res, next) =>{
        try {
            const {token, newpassword} = req.body
            

            const user = await userService.getSingleUserProfile({
                passwordResetToken:token
            })
            console.log(user);
            

            if (!user) {
                throw({code: 400, message:"Invalid or expired token", status:"INVAID-TOKEN_ERR"})
                
            }
            if (user.passwordResetExpiry < new Date()) {
                throw({code:400, message:"Token Expired", status:"TOKEN_EXPIRED_ERR"})
                
            }
            const newHashedPassword = bcrypt.hashSync(newpassword, 10)

            await userService.updateSingleProfile({
                _id: user._id
            },{
                password: newHashedPassword,
                passwordResetToken:null,
                passwordResetExpiry:null

            })

            res.json({
                message:"Passowrd Reset Successully.",
                status:"OK"
            })  
        } catch (exception) {
            next(exception)
        }

    }



}



module.exports = new AuthController()