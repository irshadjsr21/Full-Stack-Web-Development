const userList = ["John", "Ray", "Paul", "Abhishek"];

// Method 1
module.exports = {
  getUsers: (req, res) => {
    res.json({ userList });
  },
};
