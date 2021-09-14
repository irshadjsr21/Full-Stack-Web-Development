const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

const signToken = payload => {
  return jwt.sign(payload, SECRET, { expiresIn: "7 days" });
};

const verifyToken = token => {
  try {
    const decoded = jwt.verify(token, SECRET);
    if (!decoded) {
      return undefined;
    }

    return decoded;
  } catch (error) {
    return undefined;
  }
};

module.exports = { signToken, verifyToken };
