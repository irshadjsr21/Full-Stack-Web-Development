const express = require("express");
const bodyParser = require('body-parser')
const mainRouter = require("./router/index");

const app = express();

app.use(bodyParser());

app.set('view engine', 'ejs');
// Example Req: URL => /articles, METHOD => GET

app.use((req, res, next) => {
  console.log(req.url);

  next();
});

// Any Method, Any Url should be handled by mainRouter
app.use(mainRouter);

app.listen(3000, () => {
  console.log("Server has started on port 3000");
});
