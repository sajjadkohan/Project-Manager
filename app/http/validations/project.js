const { body } = require("express-validator")

const createProjectValidation = () => {
    return [
        body("title").notEmpty().withMessage("تایتل نمیتواند خالی باشد"),
        body("text").notEmpty().isLength({min : 20 }).withMessage("تکس نمیاوتند خالی باشد باید حداقل 20 کاراکتر داشته باشد")

    ]
}

module.exports = {
    createProjectValidation
}