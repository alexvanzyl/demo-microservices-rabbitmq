const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

userSchema.pre('save', async function preSave(next) {
  // Has the users password been modified? If not continue.
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  return next();
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    email: Joi
      .string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(user, schema);
}

module.exports = {
  User,
  validate: validateUser,
};
