const {StatusCodes} = require('http-status-codes');
const User = require('../models/school');

const schoolRegister = async (req,res) => {
    const user = await User.create({...req.body});

    const validationToken = user.createValidation()

    res.status(StatusCodes.CREATED).json(
        {user: {
            name: user.name
        },
        validationToken
    });
}



module.exports = {
    schoolRegister,
}