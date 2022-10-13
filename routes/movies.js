/*jshint esversion: 8 */
const {Movie, validate} = require('../models/movie');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const movies = await Movie.find();
    res.send(movies);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const genre = Genre.findById(req.body.genreId); 
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
});

router.put('/:id', async (req, res) => {
const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const custemer = await Custemer.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        },
        {
            new: true
        }
    );

    if (!custemer) return res.status(404).send('The custemer with the given ID was not found.');

    res.send(custemer);
});

router.delete('/:id',async (req, res) => {
    const custemer = await Custemer.findByIdAndRemove(req.params.id);
    if (!custemer) return res.status(404).send('The custemer with the given ID was not found.');
    res.send(custemer);
});

router.get('/:id', async (req, res) => {
    const custemer = await Custemer.findById((req.params.id));
    if (!custemer) return res.status(404).send('The custemer with the given ID was not found.');
    res.send(custemer);
});



exports = router;

