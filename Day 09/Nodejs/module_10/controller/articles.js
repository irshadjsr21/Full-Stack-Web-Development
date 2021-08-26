const articleList = [
  "Learn Javascript Basics",
  "Working with Flutter for Web developers",
  "Learning path to become a Full Stack Developer",
];

module.exports = {
  getArticles: (req, res) => {
    res.send(
      `We have the following articles in our website: ${articleList.join(", ")}`
    );
  },
};
