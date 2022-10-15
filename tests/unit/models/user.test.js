const {User} = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('user.generateAuthToken', () => { 
    it('should return a valid JWT',() => {
        const obj = {_id: new mongoose.Types.ObjectId(), isAdmin: true}
        const user = new User(obj);
        const token = user.generateAuthToken();
        const decode = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decode).toMatchObject(obj);
    });  
});