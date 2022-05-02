const { validationResult } = require("express-validator");
const { json } = require("express/lib/response");
const { userModel } = require("../../models/user");
const { hashedString, createJwt } = require("../../modules/functions");
const bcrypt = require("bcrypt");

class authController {

    async register (req , res , next) {
        try {
            
            const {username , password , email , mobile} = req.body;
            const hashedPassword = hashedString(password)
            const user = await userModel.create({username , password : hashedPassword , email , mobile})
            .catch(err => {
                console.log(err);
            })
    
            return res.json(user)

        } catch (error) {
            next(error)
        }
        
   
    }

    async login (req, res , next) {
        try {

            const {username , password} = req.body;

            
            const user = await userModel.findOne({username});
            if(!user) throw {status : 401 , message : "نام کاربری یا رمز عبور وجود ندارد"}
            
            const compaireData = bcrypt.compareSync(password , user.password);
            if(!compaireData)  throw {status : 401 , success : false , message : "رمز و نام کاربری صحیح نمیباشد"};
            
            let token = createJwt({username});
            user.token = token;
            await user.save();

            console.log(req.headers);

           return res.status(200).json({
               status : 200,
               success : true,
               message : "ورود شما موفقیت اموز بود",
               token
           })

        } catch (error) {
            next()
        }
    }

    resetPassword () {

    }

   
}

module.exports = {
    authController : new authController
}