const UserModel = require('../../dbSchema/userModel')
const ApiresponeHandler = require("../../service/ApiresponseHandler");
const jwtService = require("../../service/jwtservice")

const userController={
    userDetails:async (req,res,next)=>{
        try{
            const user =  await UserModel.findById(req.user.id).select("-password -__v -createdAt -updatedAt")
            if(!user) ApiresponeHandler.Error(res, "User not exist"); // Better error handling
            ApiresponeHandler.Success(res, "User Details",user); // Better error handling

        }
        catch(err){
            console.log(err)
            ApiresponeHandler.Error(res, err?.errorResponse?.errmsg); // Better error handling
        }

    }
}
module.exports=userController