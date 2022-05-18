const { userModel } = require("../../models/user");
const { verifyJwtToken } = require("../../modules/functions");

const checkLogin = async (req , res , next) => {

try {
    const authorization = req.headers?.authorization;
    if(!authorization) throw {status : 401 , message : "authorization مشکل داره"};

    const token = authorization.split(" ")?.[1];
    if(!token) throw {status : 401 , message : "token مشکل داره"};
    const resultToken = verifyJwtToken(token);
    // console.log("USER"+resultToken);
    if(!resultToken) throw {status : 401 , message : "توکن منقضی شده 2"};
    const {username} = resultToken;
    const user = await userModel.findOne({username} , {password : 0});
    if(!user) throw{status : 401 , message : "کاربر یافت نشد"}
    req.user = user;
    next();

} catch (error) {
    next(error)
}

}

module.exports = {
    checkLogin
}