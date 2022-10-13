/*jshint esversion: 8 */
const {Custemer, validate} = require('../models/custemer');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    const custemers = await Custemer.find().sort('name');
    res.send(custemers);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let custemer = new Custemer({ 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold 
        });
    custemer = await custemer.save();
    res.send(custemer);
});

router.put('/:id', async (req, res) => {
const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const custemer = await Custemer.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        },
        {
            new: true
        }
    );

    if (!custemer) return res.status(404).send('The custemer with the given ID was not found.');

    res.send(custemer);
});

router.delete('/:id',async (req, res) => {
    const custemer = await Custemer.findByIdAndRemove(req.params.id);
    if (!custemer) return res.status(404).send('The custemer with the given ID was not found.');
    res.send(custemer);
});

router.get('/:id', async (req, res) => {
    const custemer = await Custemer.findById((req.params.id));
    if (!custemer) return res.status(404).send('The custemer with the given ID was not found.');
    res.send(custemer);
});

module.exports = router;