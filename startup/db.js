const winston = require('winston');
const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost/corn-flix')
        .then(()=> winston.info('Connected to MongoDB...'));
};