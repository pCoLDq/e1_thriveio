// Напишите функции сортировки sortByName и sortByHeight,
// которые смогут отсортировать массив по именам (в алфавитном порядке)
// или росту (по убыванию роста). Вызовите только функцию сортировки по росту.

class Human {
  constructor(name, age, height) {
    this.name = name;
    this.age = age;
    this.height = height;
  }

  getInfo() {
    return `${this.name}, ${this.age}, ${this.height}`;
  }
  firstname() {
    return this.name;
  }
}

let humans = [
  new Human('Коля', 23, 180),
  new Human('Даша', 19, 170),
  new Human('Ваня', 18, 192),
  new Human('Петя', 45, 178),
  new Human('Вася', 34, 197),
  new Human('Джони', 40, 168),
  new Human('Катя', 37, 160),
  new Human('Петя', 29, 200),
  new Human('Соня', 21, 172),
  new Human('Женя', 25, 175),
];

function sortByName(arr) {
  let tracking = true;
  while (tracking) {
    tracking = false;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i].name < arr[i - 1].name) {
        const tmp = arr[i];
        arr[i] = arr[i - 1];
        arr[i - 1] = tmp;
        tracking = true;
      }
    }
  }
  return arr;
}
function sortByHeight(arr) {
  let tracking = true;
  while (tracking) {
    tracking = false;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i].height < arr[i - 1].height) {
        const tmp = arr[i];
        arr[i] = arr[i - 1];
        arr[i - 1] = tmp;
        tracking = true;
      }
    }
  }
  return arr;
}
console.log(sortByHeight(humans));
