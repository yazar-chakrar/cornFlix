/*jshint esversion: 8 */
const Joi = require('joi');
const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name:{
                type: String,
                requird: true,
                minlength: 5,
                maxlength: 50
            },
            isGold:{
                type: Boolean,
                default: false,
            },
            phone:{
                type: String, 
                required: true,
                minlength: 10,
                maxlength: 12 
            },
        })
    },
    movie:{
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                minlength: 0,
                maxlength: 255
            },
        })
    },
    dateOut:{
        type: Date  ,
        default: Date.now,
    },
    dateReturned:{
        type: Date  ,
    },
    phone:{
        type: Number, 
        min: 0,
    },
});

const Rental = mongoose.model('Rentals', rentalSchema);


function validateRental(rental) {
    const schema = Joi.object({
      customerId: Joi.objectId().required(),
      movieId: Joi.objectId().required(),
    });
  
    return schema.validate(rental);
}


exports.Rental = Rental;
exports.validate = validateRental;

