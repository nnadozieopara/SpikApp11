const express = require('express');
const router = express.Router()

const {
    getAllContact,
    getContact,
    contactMe
} = require('../controllers/contact');


router.route('/contact').get(getAllContact)
router.route('/contact/:id').get(getContact)
//router.route('/contact/sent').post(contactMe)
router.post('/contact/sent',contactMe)
module.exports = router;
