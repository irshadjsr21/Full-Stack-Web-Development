const Joi = require("joi");

const addPostValidator = Joi.object({
  body: Joi.string().required()
});

const updatePostValidator = Joi.object({
  body: Joi.string().required()
});

module.exports = {
  addPostValidator,
  updatePostValidator
};
