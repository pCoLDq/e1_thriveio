// Создайте глобальную функцию getObj(), которая возвращает this.
// А у каждого из объектов city1 или city2 метод getCity, который ссылается на getObj.
// Проверьте работу метода. Примечание: к объекту вызова можно обратиться через this.

function getObj() {
  return this;
}

let city1 = {};
city1.name = 'ГородN';
city1.population = 10000000;
city1.getName = function () {
  return this.name;
};
city1.getCity = function () {
  return getObj();
};

let city2 = {
  name: 'ГородN',
  population: 1e6,
  getName() {
    return this.name;
  },
  getCity() {
    return getObj();
  },
};
