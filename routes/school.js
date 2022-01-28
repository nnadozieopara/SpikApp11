const express = require('express');
const router = express.Router()
const path = require('path');

const {
    getAllSchools,
    getSchool,
    updateSchool,
    deleteSchool,
    uploadProfilePicture
} = require('../controllers/school');

const { upload } = require(path.resolve("services/uploadFile/localUpload"));
router.patch("/profilePhoto", upload, uploadProfilePicture);
router.route('/').get(getAllSchools)
router.route('/:id').get(getSchool).patch(updateSchool).delete(deleteSchool)

module.exports = router;
