// Переменная n хранит целое число от 0 до 9.
// Используя оператор switch, написать скрипт,
// который в зависимости от числа будет выводить слово
// (Например, если n равно 3, то будет выводиться слово «три»)

const n = Math.floor(Math.random() * 10);

switch (n) {
  case 0:
    console.log('ноль');
    break;
  case 1:
    console.log('один');
    break;
  case 2:
    console.log('два');
    break;
  case 3:
    console.log('три');
    break;
  case 4:
    console.log('четыре');
    break;
  case 5:
    console.log('пять');
    break;
  case 6:
    console.log('шесть');
    break;
  case 7:
    console.log('семь');
    break;
  case 8:
    console.log('восемь');
    break;
  case 9:
    console.log('девять');
    break;
}
