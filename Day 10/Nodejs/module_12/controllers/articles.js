const articleList = [
  "Learn Javascript Basics",
  "Working with Flutter for Web developers",
  "Learning path to become a Full Stack Developer"
];

// Method 1
module.exports = {
  getArticles: (req, res) => {
    res.render('articles', { title: "Article Page", articleList });
  },
  addArticles: (req, res) => {
    const body = req.body;

    if (!req.body.article) {
      res.redirect("/articles");
      return;
    }

    articleList.push(body.article);

    res.redirect("/articles");
  }
};
