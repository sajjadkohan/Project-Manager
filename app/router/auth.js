const { authController } = require("../http/controllers/auth.controller");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { registerValidator } = require("../http/validations/auth");

const router = require("express").Router();

router.use("/register" , registerValidator() , expressValidatorMapper , authController.register)

module.exports = {
    authRouter : router
}