/*jshint esversion: 8 */
const asyncMiddleware = require('../middleware/async');
const {Movie, validate} = require('../models/movie');
const {Genre} = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', asyncMiddleware(async(req, res) => {
    const movies = await Movie.find();
    res.send(movies);
}));

router.post('/', asyncMiddleware(async (req, res) => {
    //console.log("------"+req.body.title);
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId); 
    if (!genre) return res.status(400).send('Invalid Genre..!');

    let movie = new Movie({ 
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.numberInStock 
        });
    movie = await movie.save();
    res.send(movie);
}));

module.exports = router;

