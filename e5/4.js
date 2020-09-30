// Создайте функцию repeat(str, n), которая возвращает строку, состоящую
// и n повторений строки str. n — по умолчанию 2, str — пустая строка

function repeat(str = '', n = 2) {
  let rptStr = '';
  while (n > 0) {
    rptStr += str;
    n--;
  }
  return rptStr;
}
