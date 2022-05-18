const { projectModel } = require("../../models/project");

class ProjectController {

    
    async findProject (projectID , owner) {
        const project = await projectModel.findOne({owner ,_id :projectID});
        if(!project) throw {status : 401 , message : "پروژه ای یافت نشد"};
        return project
    }

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
    

   async getAllProject (req , res , next) {
        try {
            const projectID = req.params.id;
            const owner = req.user._id;

            const project = await projectModel.find({owner})
            return res.status(200).json({
                status : 201,
                success : true,
                project
            })

        } catch (error) {
            next(error)
        }
    }

    async getProjectById (req,res,next) {
        try {
            const projectID = req.params.id;

            const projectt = await projectModel.findOne({_id:projectID})

            return res.status(200).json({
                status : 201,
                success : true,
                projectt
            })

        } catch (error) {
            next(error)
        }
    }

    getAllProjectOfteam () {

    }

    getAllProjectOfUser () {

    }

    async updateProject (req, res , next) {

        try {
            const projectID = req.params.id;
            const data = req.body;

            Object.entries(data).forEach(([key , value]) => {
                let dataKey = ["tags" , "title" , "text"];
                let badValue = ["" , "  " , "." , 0 , undefined , null , NaN];

                if(!dataKey.includes(key)) delete data[key];
                if(badValue.includes(value)) {
                    delete data[ley];
                    throw {status : 400 , message : "بروز رسانی انجام نشد"}
                }
            })

            const udpateResult = await projectModel.updateOne({_id : projectID} , {$set : data});
            if(udpateResult.modifiedCount == 0) throw {status : 400 , message : "بروز رسانی انجام نشد"}

            return res.status(201).json({
                status: 201,
                success : true,
                message : "بروز رسانی با موفقیت انجام شد"
            })

        } catch (error) {
            next(error)
        }
    }

    async removeProject (req, res, next) {
        try {
            const projectID = req.params.id;

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