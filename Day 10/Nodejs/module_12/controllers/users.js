const userList = ["John", "Ray", "Paul", "Abhishek"];

// Method 1
module.exports = {
  getUsers: (req, res) => {
    res.render("users", { title: "User Page", userList });
  },
  addUsers: (req, res) => {
    const body = req.body;
    console.log(req.body);

    if (!req.body.username) {
      res.redirect("/users");
      return;
    }

    userList.push(body.username);

    res.redirect("/users");
  }
};
