const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');
const _ = require('lodash');



const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email:{
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    password:{
        type: String,
        required: true,
        maxlength: 1024
    },
    isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function(){
    return jwt.sign(_.pick(this, ['_id', 'isAdmin']), config.get('jwtPrivateKey'));
}

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema= Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(user);
};

exports.User = User;
exports.validate = validateUser;