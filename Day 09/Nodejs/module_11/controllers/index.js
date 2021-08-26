const path = require("path");

module.exports = {
  homePage: (req, res) => {
    const indexHtmlPath = path.join(__dirname, "../", "views", "index.html");

    res.sendFile(indexHtmlPath);
  }
};
