// Быстрая сортировка (Quick sort)
// Быстрая сортировка использует алгоритм "разделяй и властвуй".
// Она начинается с разбиения исходного массива на две области.
// Эти части находятся слева и справа от отмеченного элемента, называемого опорным.
// В конце процесса одна часть будет содержать элементы меньшие, чем опорный,
// а другая часть будет содержать элементы больше опорного.

let arr = Array(100);
for (let i = 0; i < arr.length; i++) {
  arr[i] = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
}
console.log(arr);
function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  let ipoint = Math.ceil(arr.length / 2);
  let point = arr[ipoint];
  let less = [];
  let greater = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < arr[ipoint]) {
      less.push(arr[i]);
    } else {
      if (i == ipoint) {
        continue;
      }
      greater.push(arr[i]);
    }
  }
  return quickSort(less).concat(point, quickSort(greater));
}
console.log(quickSort(arr));
