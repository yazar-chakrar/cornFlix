/*jshint esversion: 8 */
const mongoose = require('mongose');
const Joi = require('joi');
const {genreSchema} = require('./genre');
const { number } = require('joi');

const movieSchema = new mongoose.Schema({
    title: {
        type: string,
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
        type: number,
        required: true,
        minlength: 0,
        maxlength: 255
    },
    dailyRentalRate: {
        type: number,
        required: true,
        minlength: 0,
        maxlength: 255
    },
});

function validateMovie(movie){
    const schema = {
        title: Joi.string().min(5).max(50).required,
        genreId: Joi.string().required,
        numberInStock: Joi.number().min(0).max(255).required,
        dailyRentalRate: Joi.number().min(0).max(255).required,
    };
    return movie.validate(schema);

}


exports.Movie = Movie;
exports.validate = validateMovie;