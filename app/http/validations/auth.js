const { body } = require("express-validator");
const { userModel } = require("../../models/user");

function registerValidator () {
    return [
        body("username").custom( async(value , cyx)=> {
            if(value) {
                const usernameRegex = /^[a-z]+[a-z0-9\.\_]{3,}/gi;
                if(usernameRegex.test(value)){
                    const user = await userModel.findOne({username : value});
                    if(user) throw "نام کاربری تکراری میباشد"
                    return true
                }
            }
            throw "نام کاربری صحیح نمیباشد"
        }),

        body("email").isEmail().withMessage("ایمیل وارد شده معتبر نمیباشد")
        .custom(async email => {
            const user = await userModel.findOne({email});
            if(user) throw "این ایمیل قبلا ثبت شده است"
        }),
        body("mobile").isMobilePhone("fa-IR").withMessage("شماره موبایل صحیح نمی باشد")
        .custom(async mobile => {
            const user = await userModel.findOne({mobile});
            if(user) throw "این شملره موبایل قبلا ثبت شده است"
        }),
        body("password").isLength({min : 6 , max : 24}).withMessage("رمز عبور باید حداقل 6نویسه و حداکثر 24 نویسه باشد")
        .custom((value , ctx)=> {
            console.log(value , ctx.req.body);
        if(!value) throw "رمز عبور نمیتواند خالی باشد";
        if(value !== ctx?.req?.body?.confirm_password) throw "مرز عبور با تکرار ان یکسان نمیباشد";

            return true

        })


    ]
}

function loginValidator () {
    return [
        body("username").notEmpty().withMessage("نام کاربری نمیتواند خالی باشد")
        .custom(username => {

                const usernameRegex = /^[a-z]+[a-z0-9\.\_]{3,}/gi;
                if(usernameRegex.test(username)){
                    return true
                }
                throw "نام کاربری یا رمز عبور صحیح نمیباشد"
        }),
        body("password").isLength({min : 6 , max : 16})
        .withMessage("رمز عبور باید حداقل 6 نویسه و حداکثر 16 نویسه باشه")
    ]
}

module.exports = {
    registerValidator,
    loginValidator
}