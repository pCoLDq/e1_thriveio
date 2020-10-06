// Представьте, что разрабатываете игру. Создайте конструктор Unit(),
// создающий объекты с координатами x, y. При помощи прототипного наследования расширьте Unit(),
// создав новый конструктор Fighter() с свойством power. Примечание: не забудьте о геттерах и сеттерах.

function Unit(x, y) {
  this.x = x;
  this.y = y;
  this.setX = function (x) {
    this.x = x;
    return this;
  };
  this.setY = function (y) {
    this.y = y;
    return this;
  };
  this.getX = function () {
    return this.x;
  };
  this.getY = function () {
    return this.y;
  };
}

function Fighter(x, y, power) {
  Unit.call(this, x, y);
  this.power = power;
  this.getPower = function () {
    return this.power;
  };
  this.setPower = function (power) {
    this.power = power;
    return this;
  };
}
Fighter.prototype = Unit;
