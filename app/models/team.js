const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({

    title : {type : String , required : true},
    text : {type : String},
    image : {type : String , default : "/default/default.png"},
    owner : {type : mongoose.Types.ObjectId , required : true},
    team : {type : mongoose.Types.ObjectId},
    private : {type : Boolean , default : true}

}
,{timestamps : true}
)

const teamModel = mongoose.model("team" , teamSchema);

module.exports = {
    teamModel
}
