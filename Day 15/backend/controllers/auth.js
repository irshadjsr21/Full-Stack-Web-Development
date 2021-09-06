const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { signToken, verifyToken } = require("../utils/jwt");

module.exports = {
  signup: async (req, res) => {
    try {
      console.log(res.locals);
      const value = res.locals.body;

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(value.password, salt);

      const newUser = new User({
        name: value.name,
        email: value.email,
        password: hash
      });

      await newUser.save();

      res.json({
        message: "Signup was successful!"
      });
    } catch (error) {
      if (error && error.code === 11000) {
        res.status(409).json({ message: "This email address already exists." });
        return;
      }
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  login: async (req, res) => {
    try {
      console.log(res.locals);
      const value = res.locals.body;

      const user = await User.findOne({ email: value.email });

      if (!user) {
        res.status(401).json({ message: "Incorrect email or password." });
        return;
      }

      const result = await bcrypt.compare(value.password, user.password);
      console.log(result);

      if (!result) {
        res.status(401).json({ message: "Incorrect email or password." });
        return;
      }

      const token = signToken({ sub: user._id, email: user.email });

      res.json({
        message: "Login was successful!",
        token
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  profile: (req, res) => {
    const token = req.body.token;

    const decodedData = verifyToken(token);

    res.status(200).json({ message: "Your user profile.", decodedData });
  }
};
