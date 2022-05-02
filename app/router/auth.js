const { authController } = require("../http/controllers/auth.controller");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { registerValidator, loginValidator } = require("../http/validations/auth");

const router = require("express").Router();

router.use("/register" , registerValidator() , expressValidatorMapper , authController.register)

router.use("/login" , loginValidator() , expressValidatorMapper , authController.login)


module.exports = {
    authRouter : router
}