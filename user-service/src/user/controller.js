const { User, validate } = require('./model');
const response = require('../utils/response');

exports.register = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return response.respondBadRequest(req, res, error.details);

  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) return response.respondBadRequest(req, res, 'User already registered.');

  user = new User({ email, password });
  await user.save();

  return response.respondOK(req, res, { message: 'User created successfully!' });
};
