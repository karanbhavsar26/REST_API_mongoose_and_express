const multer = require("multer");
const ApiresponseHandler = require("../../service/ApiresponseHandler");
const path = require("path");
const ProductModel = require("../../dbSchema/productModel");
const ProductUpload = require("../../common/ProductUpload")
const Joi = require('joi');
const fs = require("fs");

const ProductController = {
    create: async (req, res, next) => {
        try {
            const multerFunction = ProductUpload()
            multerFunction(req, res, async function (err) {
                if (err instanceof multer.MulterError) {
                    // A Multer error occurred when uploading.
                    return ApiresponseHandler.Error(res, "Upload failed");
                } else if (err) {
                    // An unknown error occurred when uploading.
                    return ApiresponseHandler.Error(res, "Upload failed");
                }
                const { name, size, price } = req.body;
                let newValidateObj = {}
                newValidateObj.name = name
                newValidateObj.size = size
                newValidateObj.price = price;

                const schema = Joi.object({
                    name: Joi.string().required(),
                    size: Joi.string().required(),
                    price: Joi.number().required()
                }).required()
                const validationResult = schema.validate(newValidateObj);

                if (validationResult.error) {
                    return ApiresponseHandler.Error(res, validationResult.error?.message);
                }
                if (!req.file) {
                    return ApiresponseHandler.Error(res, "Image field is required");
                }

                const filepath = req.file.path;
                const product = new ProductModel({ name, size, price, image: filepath });
                const result = await product.save();
                if (!result) {
                    return ApiresponseHandler.Error(res, "Unsuccessful"); // Better error handling
                }
                return ApiresponseHandler.Success(res, "Product Details", result); // Better error handling
            });
        } catch (err) {
            console.log("hr", err);
            return ApiresponseHandler.Error(res, err?.message); // Better error handling
        }
    },
    update: async (req, res, next) => {
        try {
            const multerFunction = ProductUpload()
            multerFunction(req, res, async function (err) {
                if (err instanceof multer.MulterError) {
                    // A Multer error occurred when uploading.
                    return ApiresponseHandler.Error(res, "Upload failed");
                } else if (err) {
                    // An unknown error occurred when uploading.
                    return ApiresponseHandler.Error(res, "Upload failed");
                }
                const { id, name, size, price } = req.body;
                let newValidateObj = {}
                newValidateObj.name = name
                newValidateObj.size = size
                newValidateObj.price = price;

                const schema = Joi.object({
                    name: Joi.string().required(),
                    size: Joi.string().required(),
                    price: Joi.number().required()
                }).required()
                const validationResult = schema.validate(newValidateObj);

                if (validationResult.error) {
                    return ApiresponseHandler.Error(res, validationResult.error?.message);
                }
                if (!req.file) {
                    return ApiresponseHandler.Error(res, "Image field is required");
                }

                const filepath = req.file.path;

                const product = await ProductModel.findOneAndUpdate({ _id: id }, { name, size, price, image: filepath }, { new: true });
                // fs.unlink(`${appRoot}/${filepath}`, (err) => {
                //     if (err) {
                //         return ApiresponseHandler.Error(res, "Failed to delete Image ");
                //     }
                // })
                if (!product) {
                    return ApiresponseHandler.Error(res, "Unsuccessful"); // Better error handling
                }
                return ApiresponseHandler.Success(res, "Product Details", product); // Better error handling
            });
        } catch (err) {
            console.log("hr", err);
            return ApiresponseHandler.Error(res, err?.message); // Better error handling
        }
    },
    delete: async (req, res, next) => {
        try {
            const { id } = req.query;
            console.log("id",id)
            const product = await ProductModel.findOneAndDelete({ _id: id });
            console.log("product",product)
            if (!product) {
                return ApiresponseHandler.Error(res, "Product not found"); // Better error handling
            }
            fs.unlink(`${appRoot}/${product.image}`, (err) => {
                if (err) {
                    return ApiresponseHandler.Error(res, "Failed to delete Image ");
                }
            })
            return ApiresponseHandler.Success(res, "Product Details", product); // Better error handling
        } catch (err) {
            console.log("err", err);
            return ApiresponseHandler.Error(res, err?.message); // Better error handling
        }
    }
};

module.exports = ProductController;
