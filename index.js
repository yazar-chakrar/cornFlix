/*jshint esversion: 6 */
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const auth = require('./routes/auth');
const users = require('./routes/users');
const rentals = require('./routes/rentals');
const movies = require('./routes/movies');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const home = require('./routes/home');

//console.log(process.env.jwtPrivateKey);
if (!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey makanch.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost:27017/corn-flix', { useNewUrlParser: true , useUnifiedTopology: true})
    .then(()=> console.log('Connected to MongoDB...'))
    .catch(errr => console.log('ERR: ',err.message));


const app = express();
app.use(express.json());

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/rentals', rentals);
app.use('/api/movies', movies);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/', home);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));