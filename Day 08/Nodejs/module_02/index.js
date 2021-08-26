const lodash = require('lodash');

let args = [];
if(process.argv.length > 2) {
  args = process.argv.slice(2);
}

const max = lodash.max(args);

console.log(max);

