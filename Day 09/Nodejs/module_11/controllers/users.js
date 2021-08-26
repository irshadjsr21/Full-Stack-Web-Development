const path = require('path');

const userList = ["John", "Ray", "Paul", "Abhishek"];

// Method 1
module.exports = {
  getUsers: (req, res) => {
    const indexHtmlPath = path.join(__dirname, "../", "views", "users.html");

    res.sendFile(indexHtmlPath);
  }
};
