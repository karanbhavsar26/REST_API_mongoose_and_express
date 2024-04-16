
const ApiresponseHandler = require("../service/ApiresponseHandler")
const {formidable}= require('formidable');
const Joi = require('joi');
async function FormDataMiddleware (req,res,next){

    try {
        const schema =Joi.object({
            name: Joi.string().required(),
            size: Joi.string().required(),
            price: Joi.number().required()
          }).required()
const form = formidable({});
    let fields;
    let files;
        [fields, files] = await form.parse(req);
        let newValidateObj={}
        newValidateObj.name=fields.name?.[0];
        newValidateObj.size=fields.size?.[0];
        newValidateObj.price=fields.price?.[0];


        const validationResult = schema.validate(newValidateObj);
        if (validationResult.error) {
            return ApiresponseHandler.Error(res, validationResult.error?.message);
        }
console.log("req.body",fields,files,validationResult)

        if(! files?.image){ 
            return ApiresponseHandler.Error(res, "Image field is required");
        }
        next();
       } catch (err) {
           console.log(err);
           return ApiresponseHandler.Error(res, err?.message); // Better error handling
       }
}
module.exports = FormDataMiddleware;