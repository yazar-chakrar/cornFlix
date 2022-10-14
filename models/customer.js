/*jshint esversion: 8 */
const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customers',new mongoose.Schema({
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


function validateCustomer(customer) {
    const schema = Joi.object({
      name: Joi.string().min(5).required(),
      phone: Joi.string().min(5).required(),
      isGold: Joi.boolean()
    });
  
    return schema.validate(customer);
}


exports.Customer = Customer;
exports.validate = validateCustomer;

