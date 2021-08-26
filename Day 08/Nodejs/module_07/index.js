const http = require("http");

http
  .createServer(function (req, res) {
    res.write("Hello World!"); // write a response to the client
    res.end(); // end the response
  })
  .listen(3000, () => {
    console.log("Server has started on port 3000");
  }); // the server object listens on port 3000
