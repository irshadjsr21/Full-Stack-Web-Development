const http = require("http");

const userList = ["John", "Ray", "Paul", "Abhishek"];
const articleList = ["Learn Javascript Basics", "Working with Flutter for Web developers", "Learning path to become a Full Stack Developer"];

http
  .createServer(function (req, res) {
    switch (req.url) {
      case "/":
        res.write("Welcome to the world of Nodejs.");
        break;
      case "/users":
        res.write(`We have the following users in our website: ${userList.join(', ')}`);
        break;
      case "/articles":
        res.write(`We have the following articles in our website: ${articleList.join(', ')}`);
        break;
      default:
        res.statusCode = 404;
        res.write("Page not found.");
    }
    console.log(req.url);
    res.end(); // end the response
  })
  .listen(3000, () => {
    console.log("Server has started on port 3000");
  }); // the server object listens on port 3000
