// Создайте методы exportStr() у каждого из объектов.
// Этот метод должен возвращать информацию о городе в формате «name=ГородN\npopulation=10000000\n».
// Для второго города будет строка со своими значениями.
//  Примечание: можно обращаться к каждому свойству через цикл for/in,
//  но методы объекта возвращать не нужно

let city1 = {};
city1.name = 'ГородN';
city1.population = 10000000;
city1.getName = function () {
  return this.name;
};
city1.exportStr = function () {
  let res = ``;
  for (let key in this) {
    if (typeof this[key] == 'function') {
      continue;
    }
    res += `${key}=${this[key]}\n`;
  }
  return res;
};

let city2 = {
  name: 'ГородN',
  population: 1e6,
  getName() {
    return this.name;
  },
  exportStr() {
    let res = ``;
    for (let key in this) {
      if (typeof this[key] == 'function') {
        continue;
      }
      res += `${key}=${this[key]}\n`;
    }
    return res;
  },
};
