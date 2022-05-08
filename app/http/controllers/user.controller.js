const { userModel } = require("../../models/user");

class UserController {

    getProfile (req, res , next) {
        try {
    
    const user = req.user;
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
            console.log(data);
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