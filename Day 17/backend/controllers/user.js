const User = require("../models/user");

module.exports = {
  getProfile: async (req, res) => {
    const user = await User.findById(res.locals.userData.sub).select(
      "_id email name"
    );

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.status(200).json({ user });
  }
};
