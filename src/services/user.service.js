const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { randomStringGenerater } = require("../utilities/helper");
class UserService{
    async createUser(data){
        try {
            const userObj = new UserModel(data);
            return await userObj.save();
        } catch (exception) {
            console.log(exception);
            
            throw{code: 422, message:"User cannot be registered at this movement"}
        }
    }
    transformData(req, next){
         const data = req.body;
            data.password = bcrypt.hashSync(data.password)

            if (!req.file) {
                throw({code:400, details:{image:"image is required"}, mesasge:"Validation Failed", status:"VALIDATION_FAILED_ERR"})
                
            }else{

                data.image = req.file.filename
                data.emailVerified = false;
                data.otp = randomStringGenerater(6).toUpperCase()
                data.expiryTime = new Date(Date.now()+ 6000)
            }
        return data
    }

    getPublicUserProfile(userobj){
        const {_id, name, email, role, address, phone, image, status, gender, createdAt, updatedAt} = userobj

        return{
            _id, name, email, role, address, phone, image, status, gender, createdAt, updatedAt
        }
    }

    getActivateYourAccountMessage({name, otp}){
        return `<!DOCTYPE html>
            <html>
            <head>
            <meta charset="UTF-8">
            <title>Your OTP Code</title>
            </head>
            <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4fdf6;">

            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4fdf6; padding: 20px 0;">
                <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); overflow:hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color:#d4f7d4; text-align:center; padding: 30px;">
                        <h1 style="margin:0; font-size:24px; color:#2e7d32;">Welcome to Our Platform!</h1>
                        </td>
                    </tr>
                    
                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px; text-align:center; color:#333333; font-size:16px; line-height:1.5;">
                        <p>Hello <strong>${name}</strong>,</p>
                        
                        <p>Thank you for joining us! To get started, please use the OTP below to verify your account:</p>
                        
                        <!-- OTP Code -->
                        <p style="font-size:28px; font-weight:bold; color:#2e7d32; margin:30px 0; letter-spacing:3px;">
                            ${otp}
                        </p>
                        
                        <p style="font-size:16px; color:#555555; margin-top:20px;">
                            Your journey to learning and growth begins here. Unlock the full potential of our platform and explore exciting opportunities waiting just for you!
                        </p>
                        
                        <p style="font-size:14px; color:#555555; margin-top:20px;">
                            This OTP is valid for the next 10 minutes. Please do not share it with anyone.
                        </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color:#d4f7d4; text-align:center; padding:20px; font-size:12px; color:#2e7d32;">
                        &copy; 2026 Your Company Name. All rights reserved.
                        </td>
                    </tr>
                    
                    </table>
                </td>
                </tr>
            </table>

            </body>
            </html>
            `
    }

    getResendActivationOTP({name, otp}){
        return `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8" />
        <title>Resend Activation OTP</title>
        </head>
        <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4fdf6;">

        <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0; background-color:#f4fdf6;">
            <tr>
            <td align="center">

                <table width="600" cellpadding="0" cellspacing="0"
                style="background-color:#ffffff; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); overflow:hidden;">

                <!-- Header -->
                <tr>
                    <td style="background-color:#d4f7d4; padding:30px; text-align:center;">
                    <h1 style="margin:0; color:#2e7d32; font-size:24px;">
                        Activate Your Account
                    </h1>
                    </td>
                </tr>

                <!-- Body -->
                <tr>
                    <td style="padding:40px; text-align:center; color:#333333; font-size:16px; line-height:1.6;">
                    
                    <p>Hello <strong>${name}</strong>,</p>

                    <p>
                        We noticed you requested a new activation code.  
                        You’re just one step away from unlocking everything our platform has to offer 🚀
                    </p>

                    <!-- OTP -->
                    <p style="margin:30px 0; font-size:28px; font-weight:bold; color:#2e7d32; letter-spacing:4px;">
                        ${otp}
                    </p>

                    <p style="color:#555555;">
                        This OTP is valid for <strong>10 minutes</strong>.  
                        Please enter it to activate your account.
                    </p>

                    <p style="margin-top:25px; color:#555555;">
                        🌱 <strong>Why join us?</strong><br />
                        Learn new skills, grow your confidence, and take the next step toward your goals.  
                        Your journey starts the moment you activate your account!
                    </p>

                    <p style="margin-top:20px; font-size:14px; color:#777777;">
                        If you didn’t request this code, you can safely ignore this email.
                    </p>

                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td style="background-color:#d4f7d4; padding:20px; text-align:center; font-size:12px; color:#2e7d32;">
                    © 2026 Your Company Name. All rights reserved.
                    </td>
                </tr>

                </table>

            </td>
            </tr>
        </table>

        </body>
        </html>
        `
    }

    getResetPasswordMessage({name, resetLink}){
        return `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8" />
        <title>Reset Your Password</title>
        </head>
        <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4fdf6;">

        <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0; background-color:#f4fdf6;">
            <tr>
                <td align="center">

                    <table width="600" cellpadding="0" cellspacing="0"
                    style="background-color:#ffffff; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); overflow:hidden;">

                        <!-- Header -->
                        <tr>
                            <td style="background-color:#d4f7d4; padding:30px; text-align:center;">
                                <h1 style="margin:0; color:#2e7d32; font-size:24px;">
                                    Reset Your Password
                                </h1>
                            </td>
                        </tr>

                        <!-- Body -->
                        <tr>
                            <td style="padding:40px; text-align:center; color:#333333; font-size:16px; line-height:1.6;">
                            
                                <p>Hello <strong>${name}</strong>,</p>

                                <p>
                                    We received a request to reset your password.  
                                    Click the link below to set a new password:
                                </p>

                                <!-- Reset Link Button -->
                                <p style="margin:30px 0;">
                                    <a href="${resetLink}" 
                                    style="background-color:#2e7d32; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:5px; font-weight:bold;">
                                        Reset Password
                                    </a>
                                </p>

                                <p style="color:#555555;">
                                    ⚠️ This link will expire in <strong>15 minutes</strong>.  
                                    If you did not request a password reset, you can safely ignore this email.
                                </p>

                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="background-color:#d4f7d4; padding:20px; text-align:center; font-size:12px; color:#2e7d32;">
                                © 2026 Your Company Name. All rights reserved.
                            </td>
                        </tr>

                    </table>

                </td>
            </tr>
        </table>

        </body>
        </html>
        `;
    }

    getSingleUserProfile = async(filter) =>{
        try {
            const userData = await UserModel.findOne(filter)
            return userData;
            
        } catch (exception) {
            throw{code:500, message:exception.message ?? "Error Fetching User Profile", status:"ERR_FETCHING_PROFILE"}
            
        }
    }

    updateSingleProfile = async(filter, data)=>{
        try {
            const update = UserModel.findOneAndUpdate(filter, {$set: data}, {new:true})
            return update;
            
        } catch (exception) {
            throw{code: 500, mesasge: exception.message??"User Update failed", status:"ERR_UPDATING_USER"}
            
        }
    }

}

module.exports = new UserService()