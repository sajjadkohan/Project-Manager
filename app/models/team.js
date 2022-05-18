const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({

    name : {type : String , required : true},
    description : {type : String},
    username : {type : String , required : true , unique : true},
    image : {type : String , default : "/default/default.png"},
    owner : {type : mongoose.Types.ObjectId , required : true},
    team : {type : mongoose.Types.ObjectId},
    private : {type : Boolean , default : true},
    users : {type : [mongoose.Types.ObjectId] , default : []}

}
,{timestamps : true}
)

const teamModel = mongoose.model("team" , teamSchema);

module.exports = {
    teamModel
}
