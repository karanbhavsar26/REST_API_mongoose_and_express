const { Joi } = require("celebrate");

const registerSchema = {
  register: {
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
      confirmPassword: Joi.ref("password")
    }).required()
  }
}
module.exports =  registerSchema 