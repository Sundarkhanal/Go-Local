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
            }
        return data
    }

    getPublicUserProfile(userobj){
        const {_id, name, email, role, address, phone, image, status, gender, createdAt, updatedAt} = userobj

        return{
            _id, name, email, role, address, phone, image, status, gender, createdAt, updatedAt
        }
    }

}

module.exports = new UserService()