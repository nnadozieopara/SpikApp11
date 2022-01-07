const CustomAPIError = require('./customError');
const {StatusCodes} = require('http-status-codes');

//404 error
class NotFound extends CustomAPIError {
    constructor(message) {
        super(message);

        this.statusCodes = StatusCodes.NOT_FOUND
    }
} 

module.exports = NotFound;