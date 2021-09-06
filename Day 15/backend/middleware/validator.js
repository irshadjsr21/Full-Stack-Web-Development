const formatJoiError = error => {
  const formattedError = {};

  for (const detail of error.details) {
    const key = detail.context.key;
    const message = detail.message;

    formattedError[key] = message;
  }

  return formattedError;
};

const validatorMiddleware = validator => {
  return (req, res, next) => {
    console.log("In validation middleware");
    const { error, value } = validator.validate(req.body, {
      abortEarly: false
    });

    if (error) {
      console.log("Validation failed.");
      res
        .status(400)
        .json({ message: "Validation error.", error: formatJoiError(error) });
      return;
    }

    console.log("Validation successful.");
    res.locals.body = value;
    next();
  };
};

module.exports = validatorMiddleware;
