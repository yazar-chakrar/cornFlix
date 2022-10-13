/*jshint esversion: 8 */
const Joi = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model('Genres', new mongoose.Schema({
    name:{
      type: String, 
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    //auther: String,
}));

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(genre);
}

exports.Genre = Genre;
exports.validate = validateGenre;