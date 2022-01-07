const path = require('path');
const {StatusCodes} = require('http-status-codes');

//404 error
const NotFound = async(req, res, next) => res.status(StatusCodes.NOT_FOUND).render(
    'StatusCodes.NOT_FOUND',
    {
        path: req.path,
        method: req.method,
        message: send('Page does not exist')
    }
);

module.exports = NotFound;