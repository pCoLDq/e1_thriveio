// В переменных size и unit хранятся размер и единицы измерения информации 120 и «Кб» соответственно.
// Зная что могут быть заданные Кб, Мб, Гб (кило-, мега- и гигабайты) и 1килобайт равен 1024 байта, найти количество байт в size.

const size = 120;
let unit = 'Кб';

switch (unit) {
  case 'Кб':
    console.log(size * 2 ** 10);
    break;
  case 'Мб':
    console.log(size * 2 ** 20);
    break;
  case 'Гб':
    console.log(size * 2 ** 30);
    break;
}
