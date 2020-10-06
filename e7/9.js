// Создайте конструктор , который поддерживает на своих методах цепочечный синтаксис.

function Step() {
  this.distanceFromTheReferencePoint = 0;
  this.forward = function () {
    this.distanceFromTheReferencePoint++;
    return this;
  };
  this.back = function () {
    this.distanceFromTheReferencePoint--;
    return this;
  };
}
