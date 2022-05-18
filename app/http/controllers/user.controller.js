const { userModel } = require("../../models/user");

class UserController {

    getProfile (req, res , next) {
        try {

    const user = req.user;

    user.profile_image = req.protocol + "://" + req.get("host") + user.profile_image.substring(7).replace(/[\\\\]/gm,"/")

    return res.status(200).json({
        status : 200,
        user
    })

        } catch (error) {
    next(error)
        }        
    }

   async edditProfile (req , res , next) {
        try {
            
            let data = {...req.body};
            const userID = req.user._id;
            let badValue = ["" , " " , "." , null , NaN , undefined , 0 , -1];
            let fields = ["first_name" , "last_name" , "skills"];

            Object.entries(data).forEach(([key , value]) => {
                if(!fields.includes(key)) delete data[key]
                
                if(badValue.includes(value)) {delete data[key]
                    throw {status : 401 , message : "به روز رسانی انجام شد اما مقداری صحیح وارد نشده ست"}
                
                }
            })
            
            const result = await userModel.updateOne({_id : userID} , {$set : data});
            console.log("data");
            if(result.modifiedCount > 0) {
                return res.status(200).json({
                    status : 200,
                    success : true,
                    message : "با موفقیت اپدیت شد"
                })
            }

            throw {status : 401 , success : false , message : "مشکلی در اپدیت به وجود امد"}

        } catch (error) {
            next(error)
        }
    }

   async uploadProfile (req, res , next) {
        try {
            const userID = req.user._id;
            const imageFile = req.file.path.substring(40)
            console.log(imageFile);
            const result = await userModel.updateOne({_id : userID} , {$set : {profile_image : imageFile}})
            if(result.modifiedCount == 0) throw {status : 402 , success : false , message : "ناموفق"}

            return res.status(200).json({
                status : 200,
                success : true,
                message : "عملیات با موفقیت انجام شد"
            })

        } catch (error) {
            next(error)
        }
    }

    async getAllRequest (req, res , next) {
        try {
            
            const userID = req.user._id;
            const {inviteRequest} = await userModel.findOne({_id : userID},{inviteRequest : 1});

            return res.status(201).json({
                requests : inviteRequest || []
            })

        } catch (error) {
            next(error)
        }
    }

    async getStatusInviteRequestToTeam (req,res,next) {
        try {
            const userID = req.user._id;
            const statusRequest = await userModel.aggregate([
                {
                    $match : {_id : userID}
                },
                {
                    $project : {inviteRequest : 1 , _id : 0}
                }
            ])

            return res.status(201).json({
                status : 201,
                success : true,
                statusRequest : statusRequest[0].inviteRequest[0].status
            })

        } catch (error) {
            next(error)
        }
    }

    addSkills () {

    }

    acceptInviteToTeam () {

    }

    rejectInviteToTeam () {

    }


}

module.exports = {
    UserController : new UserController
}