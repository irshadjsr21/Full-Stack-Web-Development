const prompt = require("prompt-sync")({ sigint: true });
const findMax = require("./findMax");
const checkIfNumber = require("./checkIfNumber");

const name = prompt("What is your name? ");
const n = Number(prompt("Enter the no of elements. "));
const arr = [];

checkIfNumber(n, "no of elements should be a number.");

for (let i = 0; i < n; i++) {
  const elem = Number(prompt());
  checkIfNumber(elem, "The entered element is not a number.");
  arr.push(elem);
}

console.log(`Hello ${name}`);
console.log(`Max element is ${findMax(arr)}`);
