const { Joi } = require("celebrate");

const productSchema = {
  addProduct: {
    files: Joi.object({
      name: Joi.string().required(),
      size: Joi.string().required(),
      price: Joi.number().required()
    }).required()
  }
}
module.exports =  productSchema 