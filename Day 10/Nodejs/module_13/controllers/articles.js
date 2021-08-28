const articleList = [
  "Learn Javascript Basics",
  "Working with Flutter for Web developers",
  "Learning path to become a Full Stack Developer"
];

// Method 1
module.exports = {
  getArticles: (req, res) => {
    res.json({ articleList });
  },
};
