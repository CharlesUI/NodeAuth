const CustomAPIError = require('./CustomError')
const BadRequestError = require('./BadRequest')
const UnauthorizedError = require('./Unauthorized')
const NotFoundError = require('./NotFound')

module.exports = {
    CustomAPIError,
    BadRequestError,
    UnauthorizedError,
    NotFoundError
}