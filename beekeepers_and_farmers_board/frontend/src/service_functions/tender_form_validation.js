function isTenderInputValid(input) {
  let isValid = true;
  for (let field in input) {
    if (isNaN(input[field]) || +input[field] < 0 || !((+input[field] ^ 0) == +input[field])) {
      isValid = false;
    }
  }
  return isValid;
}

export { isTenderInputValid };
