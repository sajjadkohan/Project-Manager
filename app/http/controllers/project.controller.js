const { projectModel } = require("../../models/project");

class ProjectController {

   async createProject (req, res , next) {
        try {
            const {title , text} = req.body;
            const owner = req.user._id
            
            const result = await projectModel.create({title , text , owner})
            if(!result) throw {status : 400 , success : false , message : "ایجاد پروژه با شکست مواجه شد"}

            return res.status(201).json({
                status : 201,
                success : true,
                message : "پروژه با موفقیت ایجاد شد"
            })

        } catch (error) {
            next(error)
        }
    }

    getAllProject () {

    }

    getProjectById () {

    }

    getAllProjectOfteam () {

    }

    getAllProjectOfUser () {

    }

    updateProject () {

    }

    removeProject () {
        
    }

}

module.exports = {
    ProjectController : new ProjectController
}