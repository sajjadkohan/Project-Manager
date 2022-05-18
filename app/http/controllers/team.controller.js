const { teamModel } = require("../../models/team");
const { userModel } = require("../../models/user");

class TeamController {

    async createTeam (req,res,next) {
        try {
            const owner = req.user._id;
            const {name , username , description } = req.body;

            const team = await teamModel.create({
                name,
                username,
                description,
                users : owner,
                owner
            })
            if(!team) throw {status : 500 , success : false , message : "تیم ایجاد نشد"}

            return res.status(201).json({
                status : 201,
                success : true,
                message : "تیم با موفقیت ایجاد شد"
            })
        } catch (error) {
            next(error)
        }
    }

    async getMyTeams(req,res,next) {
        try {
            const userID = req.user._id;

            // const {username , teamID} = req.params;

            const team = await teamModel.aggregate([
                {
                    $match : {
                        $or : [
                            {users : userID} , {owner : userID}
                        ]
                    }
                },
                {
                    $project : {owner : 1 , name : 1}
                },
                {
                    $lookup : {
                        from : "users",
                        localField : "owner",
                        foreignField : "_id",
                        as : "ownerTeam"
                    }
                },
                {
                    $project : {"ownerTeam.username" : 1 , "ownerTeam._id" : 1}
                }
            ])
            // const nameTeamOwner = await teamModel.aggregate([])
            if(team.length == 0) throw {message : "تیمی جهت دعوت افراد یافت نشد"};
            return res.status(200).json({
                message : "این تیم پیدا شد",
                team
            })
        } catch (error) {
            next(error)
        }
    }

    async inviteUsertoTeam (req,res,next) {
        try {
            const userID = req.user._id
            const {username , teamID} = req.params;

            const team = await teamModel.find({_id : teamID})
            if(team.length == 0) {
                console.log("error ERROR")
                throw {status: 401, message : "تیمی جهت دعوت افراد یافت نشد"};
            }


            const user = await userModel.findOne({username})
            if(!user) throw {status : 401 , message : ".کاربری با این یوزرنیم یافت نشد"};

            
            const request = {
                caller :username,
                dateRequest : new Date(),
                teamID,
                status : "pending"
            }
            
            
            
            const sendRequest = await userModel.updateOne({username} ,
                 {$set : { inviteRequest: request}})
            if(sendRequest.modifiedCount == 0 ) throw {status : 401 , message : "دعوت کاربر ناموفق بود"}

            // const invitedUser = await userModel.findOne({_id : username , $or : [
            //     {inviteRequest}
            // ]})

            // if(invitedUser) throw {status: 401, message : " در خواست دعوت قبلا برای این کاربر ارسال شده است"};

            // const addtoUsers = await teamModel.updateOne({teamID} , {$push : {users : username}})
            // if(addtoUsers.modifiedCount == 0) throw {status : 401 , message : "کاربر به یوزر لیست تیم اضافه نشد"}

            return res.status(200).json({
                status : 200,
                success : true,
                message : "کاربر با موفقیت به تیم دعوت شد و موارد به مدل ان ارسال شد و کاربر به یوزر لیست تیم اضافه شد"
            })

        } catch (error) {
            next(error)
        }
    }

    removeTeamById () {

    }

    updateTeam () {

    }

    removeUserFromTeam () {

    }

    async getAllTeams (req,res,next) {
        try {
            
            const teams = await teamModel.find({});
            if(!teams) throw {status : 401 , success : false , message : "تیم پیدا نشد"}
            return res.status(200).json({
                status : 200,
                success : true,
                teams
            })

        } catch (error) {
            next()
        }
    }


}

module.exports = {
    TeamController : new TeamController
}