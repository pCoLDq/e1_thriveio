// Даны размер ипотечного кредита (S — 2 млн.руб), процентная ставка (p  — 10%),
// кол-во лет (years — 5). Найти переплату по кредиту, значение переплаты должно содержаться в переменной perepl.

let S = 2000000; // rubles
let p = 10; // percent
let years = 5;
let perepl = 0;

let St = S / (years * 12); // сумма, которая идёт на погашение тела кредита

while (S) {
  if (St > S) {
    St = S;
  }
  perepl += (S * (p / 100)) / 12;
  S -= St;
}
console.log(Math.round(perepl));
