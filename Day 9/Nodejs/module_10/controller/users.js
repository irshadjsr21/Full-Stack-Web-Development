const userList = ["John", "Ray", "Paul", "Abhishek"];

module.exports = {
  getUsers: (req, res) => {
    res.send(
      `We have the following users in our website: ${userList.join(", ")}`
    );
  },
};
