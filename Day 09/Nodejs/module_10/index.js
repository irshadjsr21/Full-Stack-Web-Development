const express = require("express");
const mainRouter = require("./router/index");

const app = express();

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use("/", mainRouter);

app.use((req, res) => {
  res.status(404).send("Page not found.");
});

app.listen(3000, () => {
  console.log("Server has started on port 3000");
});
