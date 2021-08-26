const express = require("express");
const mainRouter = require("./router/index");

const app = express();
// Example Req: URL => /articles, METHOD => GET

// Any Method, Any Url should be handled by mainRouter
app.use(mainRouter);

app.listen(3000, () => {
  console.log("Server has started on port 3000");
});
