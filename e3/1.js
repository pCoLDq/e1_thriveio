// Сортировка выбором (Selection sort)
// Для того, чтобы отсортировать массив в порядке возрастания,
// следует на каждой итерации найти элемент с наибольшим значением.
// С ним нужно поменять местами последний элемент.
// Следующий элемент с наибольшим значением становится уже на предпоследнее место.
// Так должно происходить, пока элементы, находящиеся на первых местах в массивe, не окажутся в надлежащем порядке.

let arr = Array(100);
for (let i = 0; i < arr.length; i++) {
  arr[i] = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
}

function findMax(arr) {
  let mx = arr[0];
  let imx = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > mx) {
      mx = arr[i];
      imx = i;
    }
  }
  return [mx, imx];
}

let sortedArr = Array(arr.length);

for (let i = arr.length - 1; i >= 0; i--) {
  let [mx, imx] = findMax(arr);
  sortedArr[i] = mx;
  arr.pop(imx);
}

console.log(sortedArr);
