const { body, param } = require("express-validator");
const { teamModel } = require("../../models/team");
const { userModel } = require("../../models/user");

function createTeamValidator () {
    return [
        body("name").isLength({min : 5}).withMessage("نام تیم باید بیش از 5 کاراکتر باشد"),
        body("username").custom(async username => {
            let usernameRegex = /^[a-z]+[a-z0-9\.\_\-]{3,}/gim;
            if(usernameRegex.test(username)) {
                const team = await teamModel.findOne({username});
                if(team) throw "این نام تیم قبلا ثبت شده است";
                return true
            }
            throw "نام تیم را به صورت صحیح وارد کنید"
        })
    ]
}

function userValidatorToInviteTeam () {
    return [
        param("username").custom(async username => {
            let user = await userModel.findOne({username});
            if(!user) throw "این یوزرنیم اصلا وجود ندارد";
            return true
        })
    ]
}


function teamValidatorFromInviteUser () {
    return [
        param("teamID").custom(async (teamm , {req}) => {
            const {teamID} = req.params;
            let team = await teamModel.find({_id :teamID});
            if(!team){ 
                console.log("این تیم اصلا وجود ندارد");
                throw "این تیم اصلا وجود ندارد";}
            return true
        })
    ]
}

module.exports = {
    createTeamValidator,
    userValidatorToInviteTeam,
    teamValidatorFromInviteUser
}