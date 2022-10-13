/*jshint esversion: 6 */
const express = require('express');
const mongoose = require('mongoose');

const genres = require('./routes/genres');
const custemers = require('./routes/custemers');
const home = require('./routes/home');

mongoose.connect('mongodb://localhost/corn-flix', { useNewUrlParser: true , useUnifiedTopology: true})
    .then(()=> console.log('Connected to MongoDB...'))
    .catch(errr => console.log('ERR: ',err.message));

const app = express();

app.use('/api/genres', genres);
app.use('/api/custemers', custemers);
app.use('/', home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));