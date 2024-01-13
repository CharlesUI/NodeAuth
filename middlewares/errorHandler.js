const { StatusCodes } = require('http-status-codes')
const { CustomAPIError } = require('../errors/ErrorClass')

const errorHandlerMiddleware = (err, req, res, next) => {

    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong...'
    }

    if(err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg: err.message})
    }

    if(err.code && err.code === 11000) {
        customError.statusCode = StatusCodes.BAD_REQUEST
        customError.msg = `Duplicate error for user ${err.keyValue}, please try again...`
    }

    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
    return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware