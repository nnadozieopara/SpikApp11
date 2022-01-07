const express = require('express');
const router = express.Router()

const {
    getAllSchools,
    getSchool,
    updateSchool,
    deleteSchool
} = require('../controllers/school');


router.route('/').get(getAllSchools)
router.route('/:id').get(getSchool).patch(updateSchool).delete(deleteSchool)

module.exports = router;