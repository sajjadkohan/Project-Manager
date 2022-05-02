const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

module.exports = {
    hashedString,
    createJwt
}