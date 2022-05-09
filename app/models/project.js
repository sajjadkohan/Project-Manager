const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({

    title : {type : String , required : true},
    text : {type : String , required : true},
    users : {type : [mongoose.Types.ObjectId] , default : []},
    private : {type : Boolean , default : true},
    tags : {type : [String] , default : []},
    owner : {type : mongoose.Types.ObjectId , required : true},

}
,{timestamps : true}
)

const projectModel = mongoose.model("project" , projectSchema);

module.exports = {
    projectModel
}
