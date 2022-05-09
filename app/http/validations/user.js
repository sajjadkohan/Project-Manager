const { body } = require("express-validator");
const path  = require("path");


function imageValidator () {
    return [

        body("image").custom((value , {req}) => {

            const format = [".jpg" , ".png" , ".jpeg"];
            const ext = path.extname(req.file.originalname);
            if(!format.includes(ext)) throw {message : "فرمت ارسال شده صحیح نیست"}

            console.log(req.file.size);


            return true
        })

    ]
    
}

module.exports = { 
    imageValidator
}