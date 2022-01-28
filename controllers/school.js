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

const uploadProfilePicture = async(id, uploadedFile) => {
    let acct = await School.findById(id);
    if (acct) {
        const file = File(uploadedFile, ["img"], 10000000); // max file size is 10mb > expected file is image
        const { image, error } = file; // image is the file object, error is the error object

        // cloudinary operations
        const cloud = new Cloud({ folder: "spikapp" });
        // cloudinary asset options
        const assetOptions = {
            public_id: `${id}`,
            folder: "profile_picture",
            // width: 500,
            height: 500,

        };
        if (error().type) {
            error().ok = false;
            error().status = 422;
            throw error();
        } else {
            let imgUrl,
                profile;
            // gets the profile of the client
            /*if (acct._doc.type === "user")
                profile = await userProfileModel.findOne({ accountId: acct._id });
            else profile = await barProfileModel.findOne({ accountId: acct._id });*/

            if (profile.photo) {
                // update existing photo
                imgUrl = await cloud.update(image().path, assetOptions);
            } else {
                // upload new photo
                imgUrl = await cloud.upload(image().path, assetOptions);
            }
            const { secure_url } = imgUrl;
            // save to db
            profile.photo = secure_url;
            await profile.save();
            let imgObject;
            if (profile.photo) {
                /* gets the image from cloudinary with custom styling*/
                let img = await new Cloud({ folder: 'spikapp' }).get(id, { folder: 'profile_picture', transformation: [{ width: 250, height: 250, crop: 'crop', gravity: 'face', background: 'transparent', radius: 'max' }] });
                imgObject = { dp: img, normal: profile.photo };
            }
            // delete asset from our server
            helper.deleteFileFrom(image().path, _ =>
                console.log(`Local file ${image().name} deleted`)
            );
            return {
                ok: true,
                message: "Profile picture updated successfully!",
                imgUrl: imgObject,
            };
        }
    } else throw { ok: false, status: 404, message: "Account does not exist!" };

};

module.exports = {
    getAllSchools,
    getSchool,
    updateSchool,
    deleteSchool,
    uploadProfilePicture
}

