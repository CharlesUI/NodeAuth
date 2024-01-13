const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
});

// pre middleware: before saving, run the function that hashes the password
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  //next function is not needed in mongoose 5.X
  next();
});

//UserSchema methods: Create token in the mongoose middleware instance function and call it in the user schema in register
UserSchema.methods.createJWT = function () {
  const token = jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
  return token;
};

//Instance funtion for comparing the hashed password
UserSchema.methods.comparePassword = async function(candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
