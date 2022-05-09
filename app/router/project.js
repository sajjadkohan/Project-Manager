const { ProjectController } = require("../http/controllers/project.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { createProjectValidation } = require("../http/validations/project");
const { uploadfile } = require("../modules/express-fileupload");

const router = require("express").Router();
router.post("/create" ,uploadfile, checkLogin , createProjectValidation() , expressValidatorMapper ,ProjectController.createProject)
module.exports = {
    projectRouter : router
}