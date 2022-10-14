/*jshint esversion: 8 */
const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('./genre');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 255
    },
});
const Movie = mongoose.model('Movies', movieSchema);

function validateMovie(movie){
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required(),
    });
    return schema.validate(movie);

}

exports.Movie = Movie;
exports.validate = validateMovie;