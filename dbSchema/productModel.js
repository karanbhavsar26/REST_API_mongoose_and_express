const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productModel = new Schema({
    name: {type: String, required: true},
    size: {type: String, require: true},
    price: {type: Number, required: true},
    image: { type : String, required: true}
},{timestamps: true});

module.exports = mongoose.model('Product', productModel, "products");