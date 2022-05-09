const fileupload = require("express-fileupload");
const { path } = require("express/lib/application");
const { createUplodPath } = require("./functions");

const uploadfile = (req, res , next) => {
    try {
        
        fileupload();
        if(Object.keys(req.files).length == 0 ) throw {status: 401 , message : "لطفا تصویر شاخص پروژه را انتاخب کنید"}
        console.log(req.files , req.file);
        let image = req.files;
        let uploadpath = path.join(__dirname , createUplodPath())
        image.mv()(uploadpath , (err) => {
            if(err) throw {status : 401 , message : "بارگذاری انجام نشد"}
            next()
        })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    uploadfile
}
