/*jshint esversion: 6 */
const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title:'May Express App', message: 'Hi Im Yasser'});
  });

module.exports = router;