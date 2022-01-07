const mongoose = require('mongoose');
const validation = require('jsonwebtoken');
const config = require('../utilities/configuration');

const schoolSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, 'Please provide a school name'],
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    address: {
        type: String,
        required: [true, 'Please provide a school address'],
        minlength: 3,
        maxlength: 80,
    },
    phoneOne: {
        type: Number,
        default: true
    },
    phoneTwo: {
        type: Number,
        default: true
    },
    phoneThree: {
        type: Number,
        default: true
    },
    phoneFour: {
        type: Number,
        default: true
    }, 
}, {timestamps: true})

//validating school registration form
schoolSchema.methods.createValidation =function () {
    return validation.sign({
        school_id: this._id,
        school_name: this.name
    }, config.JWT_SECRET,
    {expiresIn: config.JWT_LIFETIME},)
}


module.exports = mongoose.model('School', schoolSchema);