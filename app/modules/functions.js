const bcrypt = require("bcrypt");

function hashedString (data) {
    const salt = bcrypt.genSaltSync(13);
    const hashed = bcrypt.hashSync(data , salt);
    return hashed
}

module.exports = {
    hashedString
}