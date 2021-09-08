const Joi = require("joi");

const signupValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .required()
    .min(8)
});

const loginValidator = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .required()
    .min(8)
});

module.exports = {
  signupValidator,
  loginValidator,
};
