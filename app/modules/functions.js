const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { json } = require("express/lib/response");

function hashedString (data) {
    const salt = bcrypt.genSaltSync(13);
    const hashed = bcrypt.hashSync(data , salt);
    return hashed
}

// const SECTER_KEY = "6623263017C3AA6146F97F96F562BC30";

const EXPIRE_IN = "6 days";


function createJwt (payload) {
    const {username} = payload;
    const token = jwt.sign(payload , process.env.SECRET_KEY , {expiresIn : EXPIRE_IN});

    return token
    
}

function verifyJwtToken (token) {
    const result = jwt.verify(token , process.env.SECRET_KEY);
    if(!result.username) throw "توکن منقضی شده";
    return result
}

function createUplodPath () {
    let dt = new Date();
    const year = dt.getFullYear() + "";
    const month = dt.getMonth() + "";
    const day = dt.getDay() + "";

    const uploadPath = path.join(__dirname , ".." , ".." , "public" , "upload" , year , month , day)
    // console.log(uploadPath);
    fs.mkdirSync(uploadPath, {recursive : true});
   return uploadPath


}

module.exports = {
    hashedString,
    createJwt,
    verifyJwtToken,
    createUplodPath
}