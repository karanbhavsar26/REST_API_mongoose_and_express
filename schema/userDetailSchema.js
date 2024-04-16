const {Joi} = require('celebrate')
const userDetailSchema ={
    userDetail:{
        headers:Joi.object({
            authorization:Joi.string().required()
        }).unknown()
    }
}
module.exports=userDetailSchema