const { StatusCodes } = require('http-status-codes')
const { CustomAPIError } = require('../errors/ErrorClass')

const errorHandlerMiddleware = (err, req, res, next) => {
    const statusCode = err instanceof CustomAPIError ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR

    res.status(statusCode).json({ msg: err.message || "Something went wrong..." })
}

module.exports = errorHandlerMiddleware