const prompt = require("prompt-sync")({ sigint: true });

const name = prompt("What is your name? ");
const n = Number(prompt("Enter the no of elements. "));
const arr = [];

if (isNaN(n)) {
  console.error("no of elements should be a number.");
  process.exit(1);
}

for (let i = 0; i < n; i++) {
  const elem = Number(prompt());
  if (isNaN(elem)) {
    console.error("The entered element is not a number.");
    process.exit(1);
  }
  arr.push(elem);
}

function findMax(array) {
  let max = array[0];
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) max = array[i];
  }
  return max;
}

console.log(`Hello ${name}`);
console.log(`Max element is ${findMax(arr)}`);
