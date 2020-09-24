// Сортировка слиянием (Merge sort)
// При рекурсивной сортировке слиянием массив сначала разбивается на мелкие кусочки - на первом этапе - на состоящие из одного элемента.
// Затем эти кусочки объединяются в более крупные кусочки - по два элемента и элементы при этом сравниваются,
// а в результате в новом кусочке меньший элемент занимает место слева, а больший - справа.
// Далее происходит слияние в ещё более крупные кусочки и так до конца алгоритма,
// когда все кусочки будут объединены в один, уже отсортированный массив.
// Если есть интерес, есть статья о рекурсивных функциях.

let arr = Array(100);
for (let i = 0; i < arr.length; i++) {
  arr[i] = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
}
console.log(arr);

function merge(left, right) {
  let resultArray = [],
    leftIndex = 0,
    rightIndex = 0;

  // We will concatenate values into the resultArray in order
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      resultArray.push(left[leftIndex]);
      leftIndex++; // move left array cursor
    } else {
      resultArray.push(right[rightIndex]);
      rightIndex++; // move right array cursor
    }
  }

  // We need to concat here because there will be one element remaining
  // from either left OR the right
  return resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function mergeSort(unsortedArray) {
  // No need to sort the array if the array only has one element or empty
  if (unsortedArray.length <= 1) {
    return unsortedArray;
  }
  // In order to divide the array in half, we need to figure out the middle
  const middle = Math.floor(unsortedArray.length / 2);

  // This is where we will be dividing the array into left and right
  const left = unsortedArray.slice(0, middle);
  const right = unsortedArray.slice(middle);

  // Using recursion to combine the left and right
  return merge(mergeSort(left), mergeSort(right));
}
console.log(mergeSort(arr));
