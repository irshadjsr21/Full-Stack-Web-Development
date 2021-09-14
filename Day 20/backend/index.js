const dotenv = require("dotenv-flow");
dotenv.config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

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

const run = async () => {
  await mongoose.connect("mongodb://localhost:27017/socialmedia");

  app.listen(5000, () => {
    console.log("Server has started on port 5000");
  });
};

run();
