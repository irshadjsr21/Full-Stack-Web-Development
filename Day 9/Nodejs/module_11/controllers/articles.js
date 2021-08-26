const path = require('path');

const articleList = [
  "Learn Javascript Basics",
  "Working with Flutter for Web developers",
  "Learning path to become a Full Stack Developer"
];

// Method 1
module.exports = {
  getArticles: (req, res) => {
    const indexHtmlPath = path.join(__dirname, "../", "views", "articles.html");

    res.sendFile(indexHtmlPath);
  }
};
