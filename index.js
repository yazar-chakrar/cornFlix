/*jshint esversion: 6 */
const express = require('express');
const genres = require('./routes/genres');
const home = require('./routes/home');
const starterDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
/* const config = require('config');
 */const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.static('public'));
app.use(helmet());
app.use('/api/genres', genres);
app.use('/', home);

if (app.get('env') == 'development'){
  app.use(morgan('tiny'));
  starterDebugger('start Debuger enabled ...');
}
//

/* console.log('App name: ' + config.get('name'));
console.log('Mail server: ' + config.get('mail.host'));
console.log('Mail password: ' + config.get('mail.password'));
 */

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));