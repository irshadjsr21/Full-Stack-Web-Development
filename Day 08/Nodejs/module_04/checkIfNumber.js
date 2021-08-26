function checkIfNumber(num, errorMsg) {
  if (isNaN(num)) {
    console.error(errorMsg);
    process.exit(1);
  }
}

module.exports = checkIfNumber;
