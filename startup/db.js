const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = () => {
    const db = config.get('db');
    mongoose.connect(db)
        .then(()=> console.log(`INFO: Connected to ${db}...`));
};