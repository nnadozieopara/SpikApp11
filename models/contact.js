const mongoose = require('mongoose');
const config = require('../utilities/configuration');

const contactSchema =  mongoose.Schema ( { 
    name: { type: String,
         required: [true, 'Please enter your name'],
         trim: true, 
         minlength: 3, 
         maxlength: 50, }, 
    email: { type: String, 
         required: [true, 'Please enter your email'], 
         //unique: true, 
         minlength: 3, 
         maxlength: 80, },  
    message: {
    type: String,
        required: [true, 'Speak up and save lifes'],
        minlength: 2
}}, 
{
    timestamps: true}) 
module.exports = mongoose.model('Contact', contactSchema);