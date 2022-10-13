/*jshint esversion: 8 */
const Joi = require('joi');
const mongoose = require('mongoose');

const Custemer = mongoose.model('Custemers',new mongoose.Schema({
    name:{
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 50 
    },
    isGold:{
        type: Boolean,
        default: false,
    },
    phone:{
        type: String, 
        required: true,
        minlength: 10,
        maxlength: 12 
    },
}));


function validateCustemer(custemer) {
    const schema = Joi.object({
      name: Joi.string().min(5).required(),
      phone: Joi.string().min(5).required(),
      isGold: Joi.boolean()
    });
  
    return schema.validate(custemer);
}


exports.Custemer = Custemer;
exports.validate = validateCustemer;

