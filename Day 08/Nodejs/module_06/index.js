const fs = require("fs");

console.log("Starting to read");
const readableStream = fs.createReadStream("test.txt");

const writableStream = fs.createWriteStream("test2.txt");

writableStream.on("error", function(err) {
  console.log(err);
});

readableStream.on("data", chuck => {
  writableStream.write(chuck);
});

readableStream.on("end", function() {
  console.log("End of file");
});

readableStream.on("error", function(err) {
  console.log(err.stack);
});
