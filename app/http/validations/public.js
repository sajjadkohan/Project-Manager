const { param } = require("express-validator");

function mongoIDValidation () {
    return [

        param("id").isMongoId().withMessage("ایدی به درستی وارد نشده")
    ]
}

module.exports = {
    mongoIDValidation
}