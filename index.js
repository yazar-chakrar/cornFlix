/*jshint esversion: 6 */
const express = require('express');
const winston = require('winston');

const app = express();

require('./startup/conf')();
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./api/joi')();

//throw new Error('UncaughtException : Something wrong happend on startup.');
/* const p = Promise.reject(new Error('unhandledRejection ERROR.'));
p.then(()=> console.log('unhandledRejection Suml done.')); */

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`INFO: Listening on port ${port}...`));