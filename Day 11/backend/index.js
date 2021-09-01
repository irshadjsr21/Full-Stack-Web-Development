const express = require("express");
const cors = require("cors");

const mainRouter = require("./router/index");

const app = express();

app.use(express.json());
app.use(cors());

// Example Req: URL => /articles, METHOD => GET

app.use((req, res, next) => {
  console.log(req.url);

  next();
});

// Any Method, Any Url should be handled by mainRouter
app.use(mainRouter);

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
