// Создайте у объектов city1 и city2 методы getName(), которые вернут соответствующие названия городов

let city1 = {};
city1.name = 'ГородN';
city1.population = 10000000;
city1.getName = function () {
  return this.name;
};

let city2 = {
  name: 'ГородN',
  population: 1e6,
  getName() {
    return this.name;
  },
};
