const {StatusCodes} = require('http-status-codes');
//let ip = require("public-ip");
//(Use `node --trace-warnings ...` to show where the warning was created)

const ErrorHandler = ( err, req, res, next) => {
    //to run the 404 or status error
    console.log(err.stack);

    let customError = {
        //set default error
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, kindly try again',
        stack: err.stack,
        
        //ip: await ip.v4(),
    }

    //to registered school trying to register again with the same email address
    if(err.code && err.code ===11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(
            err.keyValue
        )} field, Please choose another value`
        customError.statusCode = 400
    }

    //using wrong unique id
    if (err.name === 'CastError') {
        customError.msg = `No school details found with this id: ${err.value}`
        customError.statusCode = 404
    }

    // return res
    // .status(StatusCodes.INTERNAL_SERVER_ERROR)
    // .json(err);


    return res
    .status(customError.statusCode)
    .json({
        msg: customError.msg, 
        stack: customError.stack
        }); 
}

module.exports = ErrorHandler;