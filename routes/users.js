const asyncMiddleware = require('../middleware/async');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/me', auth, asyncMiddleware(async (req, res)=>{
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);

}));

router.get('/', asyncMiddleware(async (req, res)=>{
    const users = await User.find();
    res.send(users);
}));

router.post('/', asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('email is used ...');

    
    user = new User(_.pick(req.body, ['name', 'email', 'password' ]));
    
    const salt = await bcrypt.genSalt(5);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));

}));

module.exports = router;