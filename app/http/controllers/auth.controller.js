const { validationResult } = require("express-validator");
const { json } = require("express/lib/response");
const { userModel } = require("../../models/user");
const { hashedString } = require("../../modules/functions");

class authController {

    async register (req , res , next) {
        try {
            
            const {username , password , email , mobile} = req.body;
            const hashedPassword = hashedString(password)
            const user = await userModel.create({username , password : hashedPassword , email , mobile})
            .catch(err => {
                if(err.code == 11000) {
                   res.json({status : 400 , success : false , message : "نام کاربری شما قبلا استفاده شدهاست"}) 
                }
            })
    
            return res.json(user)

        } catch (error) {
            next(error)
        }
        
   
    }

    login () {

    }

    resetPassword () {

    }

   
}

module.exports = {
    authController : new authController
}