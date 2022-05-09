const { projectModel } = require("../../models/project");

class ProjectController {

   async createProject (req, res , next) {
        try {
            const {title , text , tags} = req.body;
            const owner = req.user._id
            
            const result = await projectModel.create({title , text , owner , tags})
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

    async findProject (projectID , owner) {
        const project = await projectModel.findOne({owner ,_id :projectID});
        if(!project) throw {status : 401 , message : "پروژه ای یافت نشد"};
        return project
    }

    async getProjectById (req,res,next) {
        try {
            const projectID = req.params.id;
            const owner = req.user._id;

            const project = await this.findProject(projectID , owner);

            return res.status(200).json({
                status : 201,
                success : true,
                project
            })

        } catch (error) {
            next(error)
        }
    }

    getAllProjectOfteam () {

    }

    getAllProjectOfUser () {

    }

    updateProject () {

    }

    async removeProject (req, res, next) {
        try {
            const projectID = req.params.id;
            const owner = req.user._id;
            await this.findProject(projectID , owner);
            const deleteProjectResult = await projectModel.deleteOne({_id : projectID});

            if(deleteProjectResult.deletedCount == 0 ) throw{status : 401 , success : false , message : "پروژه حذف نشد"};

            return res.status(201).json({
                status : 201,
                success : true,
                message : "پروژه با موفقیت حذف شد"
            })
             

        } catch (error) {
            next(error)
        }
    }

}

module.exports = {
    ProjectController : new ProjectController
}