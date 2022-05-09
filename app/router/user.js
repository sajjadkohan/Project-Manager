const { UserController } = require("../http/controllers/user.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { imageValidator } = require("../http/validations/user");
const { uploadimgProfile } = require("../modules/multer");

const router = require("express").Router();

router.get("/profile" , checkLogin , UserController.getProfile);
router.post("/edit_profile" , checkLogin , UserController.edditProfile);
router.post("/upload_profile" ,checkLogin , uploadimgProfile.single("image") ,  imageValidator() ,  UserController.uploadProfile);



module.exports = {
    userRouter : router
}