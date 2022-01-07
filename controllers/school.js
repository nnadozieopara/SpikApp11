const School = require('../models/school');
const {StatusCodes} = require('http-status-codes');
const {BadRequest} = require('../errors');
const {NotFound} = require('../errors');

const getAllSchools = async (req, res) => {
    const schools = await School
    .find({})
    .sort('timestamps');

    res
    .status(StatusCodes.OK)
    .json({
        schools, count: schools.length
    });

}

const getSchool = async (req, res) => {
    const {id: schoolID} = req.params;

    const school = await School
    .findOne({
        _id: schoolID
    });

    //for wrong ID input by the client
    if (!school) {
        throw new NotFound(` School with this unique id: ${schoolID} not registered`)
    }

    res.status(StatusCodes.OK).json({school})
}

const updateSchool = async (req, res) => {
    const {id: schoolID} = req.params;

    const updateSchools = await School
    .findByIdAndUpdate({
        _id: schoolID},
         req.body, {
        new: true,
        runValidators: true,
    });

    if (!updateSchools) {
        throw new NotFound(` School with this unique id: ${schoolID} not registered`)
    }

    res
    .status(StatusCodes.OK)
    .json({
        ok: true, 
        msg:'School has been updated successfully',
        school: updateSchools
    })
}

const deleteSchool = async (req, res) => {
    const {id: schoolID} = req.params;

    const deleteSchools = await School
    .findByIdAndDelete({
        _id: schoolID
    })

    if (!deleteSchools) {
        throw new NotFound(` School with this unique id: ${schoolID} not registered`)
    }

    res
    .status(StatusCodes.OK)
    .json({
        ok: true, 
        msg:'School has been deleted successfully',
        school: deleteSchools
    })
}

module.exports = {
    getAllSchools,
    getSchool,
    updateSchool,
    deleteSchool,
}
