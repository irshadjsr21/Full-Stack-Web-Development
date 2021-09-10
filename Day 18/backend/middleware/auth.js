const { verifyToken } = require("../utils/jwt");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    res.status(401).json({ message: "Unauthorized." });
    return;
  }

  const token = authHeader.replace("Bearer ", "");

  const decodedData = verifyToken(token);

  if (!decodedData) {
    res.status(401).json({ message: "Unauthorized." });
    return;
  }

  res.locals.userData = decodedData;
  next();
};

module.exports = authMiddleware;
