const { BadRequestError, UnauthorizedError } = require("../errors/ErrorClass");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  // Use the pre middleware of mongoose in User Model to hash the password 
  // instead of hashing it in the register middleware
  const user = await User.create({ ...req.body });
  //Create a function instance in the UserSchema
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({user: { name: user.name }, token })
};

const login = async (req, res) => {
  const { email, password } = req.body
  if(!email || !password) {
    throw new BadRequestError('Please provide the necessary details')
  }

  //Compare user password and email
  const user = await User.findOne({ email })
  if(!user) {
    throw new UnauthorizedError('Invalid Credentials')
  }
  //If user exist but wrong password, throw the same error
  const isPasswordCorrect = await user.comparePassword(password)
  if(!isPasswordCorrect) {
    throw new UnauthorizedError('Invalid Credentials')
  }

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({user: { name: user.name }, token})
};

module.exports = {
  register,
  login,
};
