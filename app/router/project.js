const { ProjectController } = require("../http/controllers/project.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { createProjectValidation } = require("../http/validations/project");
const { mongoIDValidation } = require("../http/validations/public");
const { uploadfile } = require("../modules/express-fileupload");

const router = require("express").Router();
router.post("/create" , checkLogin , createProjectValidation() , expressValidatorMapper ,ProjectController.createProject)

router.get("/list" , checkLogin ,ProjectController.getAllProject);
router.get("/:id" , checkLogin , mongoIDValidation() , expressValidatorMapper ,ProjectController.getProjectById);

router.delete("/remove/:id" , checkLogin , mongoIDValidation() , expressValidatorMapper ,ProjectController.removeProject);

router.put("/edit/:id" , checkLogin , mongoIDValidation() , expressValidatorMapper ,ProjectController.updateProject);

module.exports = {
    projectRouter : router
}