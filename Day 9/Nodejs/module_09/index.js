const express = require("express");

const app = express();

const userList = ["John", "Ray", "Paul", "Abhishek"];
const articleList = [
  "Learn Javascript Basics",
  "Working with Flutter for Web developers",
  "Learning path to become a Full Stack Developer",
];

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to the world of Nodejs.");
});

app.get("/users", (req, res) => {
  res.send(
    `We have the following users in our website: ${userList.join(", ")}`
  );
});

app.get("/articles", (req, res) => {
  res.send(
    `We have the following articles in our website: ${articleList.join(", ")}`
  );
});

app.use((req, res) => {
  res.status(404).send("Page not found.");
});

app.listen(3000, () => {
  console.log("Server has started on port 3000");
});
