const fs = require("fs");

console.log("Start of index.js");

fs.writeFile('test.txt', 'We are writing a .txt file with nodejs.', function(error) {
  if (error) {
    console.log(error);
    return;
  }

  console.log("File written successfully.");
});

console.log("End of index.js");
