// Создайте функцию avg() , которая будет находить среднее значение
// по всем своим аргументам (аргументы величины числовые).

function avg(...nums) {
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
  }
  return sum / nums.length;
}
