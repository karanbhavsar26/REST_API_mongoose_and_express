const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userModel = new Schema({
    name: {type: String, required: true},
    email: {type: String, require: true, index:true, unique:true,sparse:true},
    password: {type: String, required: true},
    role: { type : String, default : 'customer'}
},{timestamps: true});

module.exports = mongoose.model('User', userModel, "users");
