function hasWhiteSpace(str) {
  return str.indexOf(' ') >= 0;
}

function isInputValid(input) {
  let isValid = true;
  for (let field in input) {
    switch (field) {
      case 'numOfHives':
        if (isNaN(input[field]) || +input[field] < 0 || !((+input[field] ^ 0) == +input[field])) {
          isValid = false;
        }
        break;

      case 'userType':
        break;

      default:
        if (!input[field] || hasWhiteSpace(input[field])) {
          isValid = false;
        }
        break;
    }
  }
  return isValid;
}

export { isInputValid };
