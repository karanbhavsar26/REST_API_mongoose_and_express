
const ApiresponeHandler = require("../service/ApiresponseHandler");
const jwtService = require("../service/jwtservice")

async function AuthMiddleware (req, res, next) {
    try{
        const authorization = req.headers.authorization
        if(!authorization) ApiresponeHandler.Error(res,"User is not authorized")
        const {id,role} = await  jwtService.verify(authorization)
         req.user={id:id,role:role}
        next()
    }
    catch(err){
         next(ApiresponeHandler.Error(res, "Token Expired")); // Better error handling
    }
}
module.exports = AuthMiddleware