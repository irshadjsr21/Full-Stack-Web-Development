module.exports = {
  homePage: (req, res) => {
    res.render("index", {
      title: "Full Stack Web Development Changed!",
      isLoggedIn: true
    });
  }
};
