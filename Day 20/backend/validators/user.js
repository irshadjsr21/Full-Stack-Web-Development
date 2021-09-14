const Joi = require("joi");

const editBioValidator = Joi.object({
  bio: Joi.string().required()
});

module.exports = {
  editBioValidator
};
