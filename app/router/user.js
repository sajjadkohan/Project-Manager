const { UserController } = require("../http/controllers/user.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");

const router = require("express").Router();

router.get("/profile" , checkLogin , UserController.getProfile);
router.post("/edit_profile" , checkLogin , UserController.edditProfile);


module.exports = {
    userRouter : router
}