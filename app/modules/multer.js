const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { createUplodPath } = require("./functions");

const storage = multer.diskStorage({

    // storage
    destination : (req , file , callback) => {
        callback(null , createUplodPath())
    },

    filename : (req , file , callback) => {
        const type = path.extname(file.originalname);
        callback(null , String(Date.now() + type))
    }
}) 

const uploadimgProfile = multer({storage})

module.exports = {
    uploadimgProfile
}

