/*jshint esversion: 8 */
const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name:{
      type: String, 
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    //auther: String,
})
const Genre = mongoose.model('Genres', genreSchema);

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(genre);
}

exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;