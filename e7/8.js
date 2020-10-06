// Через прототип расширьте встроенный объект Number методом isOdd(), который возвращает true, если число нечетное.

Number.prototype.isOdd = function () {
  if (this % 2 == 0) {
    return false;
  }
  return true;
};
