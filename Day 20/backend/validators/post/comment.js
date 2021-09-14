const Joi = require("joi");

const addCommentValidator = Joi.object({
  body: Joi.string().required()
});

const updateCommentValidator = Joi.object({
  body: Joi.string().required()
});

module.exports = {
  addCommentValidator,
  updateCommentValidator
};
