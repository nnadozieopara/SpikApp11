const CustomAPIError = require('./customError');
const {StatusCodes} = require('http-status-codes');

//400 error
class BadRequest extends CustomAPIError {
    constructor(message) {
        super(message);

        this.statusCodes = StatusCodes.BAD_REQUEST
    }
} 

module.exports = BadRequest;