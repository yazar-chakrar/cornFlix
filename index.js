/*jshint esversion: 6 */
/* used placed of async middlware
require('express-async-errors');*/
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const error = require('./middleware/error');

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

mongoose.connect('mongodb://localhost/corn-flix', { useNewUrlParser: true , useUnifiedTopology: true})
    .then(()=> console.log('Connected to MongoDB...'))
    .catch(err => console.log('ERR: ',err.message));


const app = express();
app.use(express.json());

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/rentals', rentals);
app.use('/api/movies', movies);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/', home);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));