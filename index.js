/*jshint esversion: 6 */
/* used placed of async middlware
require('express-async-errors');*/
//loggin errors and save it
const winston = require('winston');
require('winston-mongodb');

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
const { transport } = require('winston');

const app = express();

process.on('uncaughtException', (ex)=>{
    //console.log('UncaughtException found on startup.');
    winston.error(ex.message, ex);
    process.exit(1);
});
process.on('unhandledRejection', (ex)=>{
    //console.log('unhandledRejection found on startup.');
    winston.error(ex.message, ex);
    process.exit(1);
});

winston.add(new winston.transports.File ({filename: 'logfile.log'}));
//winston.add(new winston.transports.MongoDB ({db: 'mongodb://localhost/corn-flix/?authSource=admin', capped : true}));

//throw new Error('UncaughtException : Something wrong happend on startup.');
const p = Promise.reject(new Error('unhandledRejection ERROR.'));
p.then(()=> console.log('unhandledRejection Suml done.'));
//console.log(process.env.jwtPrivateKey);
if (!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey makanch.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/corn-flix', { useNewUrlParser: true , useUnifiedTopology: true})
    .then(()=> console.log('Connected to MongoDB...'))
    .catch(err => console.log('ERR: ',err.message));

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