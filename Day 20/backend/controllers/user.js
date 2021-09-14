const User = require("../models/user");

module.exports = {
  getProfile: async (req, res) => {
    const user = await User.findById(res.locals.userData.sub).select(
      "_id email name bio createdAt updatedAt"
    );

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.status(200).json({ user });
  },

  editBio: async (req, res) => {
    const body = res.locals.body;

    const user = await User.findOneAndUpdate(
      {
        _id: res.locals.userData.sub
      },
      {
        $set: { bio: body.bio }
      },
      { new: true }
    ).select('-password');

    res.status(200).json({ message: "Bio updated successfully.", user });
  }
};
