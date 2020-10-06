// Укажите классу метод getInfo (он должен возвращать строки вида «Коля, 23, 180»),
// метод геттер firstname ( он должен возвращать свойство name объекта)

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
