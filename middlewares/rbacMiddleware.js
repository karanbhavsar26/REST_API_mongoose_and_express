const ApiresponeHandler= require("../service/ApiresponseHandler")
const UserModel = require("../dbSchema/userModel");

const RbacMiddleware=async (req,res,next)=>{
    try{
        const User = await UserModel.findById(req?.user?.id)
        if(!User) {
            return ApiresponeHandler.Error(res, "User not exist"); // Better error handling
        }
        if(User?.role!="admin") {
            return ApiresponeHandler.Error(res, "Access denied");
        }
        next()
    }
    catch( err){   
        console.log(err)
        ApiresponeHandler.Error(res, err?.message); // Better error handling
    }
}
module.exports = RbacMiddleware