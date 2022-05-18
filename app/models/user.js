const mongoose = require("mongoose");

const InviteRequest = new mongoose.Schema({
    teamID : {type : mongoose.Types.ObjectId , required : true},
    caller : {type : String , required : true , lowercase : true},
    dateRequest : {type : Date , default : new Date()},
    status : {type : String , default : "pending"}
})

const userSchema = new mongoose.Schema({

    first_name : {type : String},
    last_name : {type : String},
    username : {type : String , required : true , unique : true},
    email : {type : String , required : true , unique : true},
    username : {type : String , required : true , unique : true},
    mobile : {type : String , required : true , unique : true},
    roles : {type : [String] , default : ["USER"]},
    password : {type : String , required : true},
    profile_image : {type : String},
    skills : {type : [String] , default : []},
    token : {type : String , default : ""},
    teams : {type : [mongoose.Types.ObjectId] , default : []},
    inviteRequest : {type : [InviteRequest] , default : []}

}
,{timestamps : true}
)

const userModel = mongoose.model("user" , userSchema);

module.exports = {
    userModel
}
