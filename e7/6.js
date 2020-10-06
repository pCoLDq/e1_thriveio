// Напишите функцию getDays, которая принимает год и месяц
//  (пусть январь будет — 1, февраль — 2 и т.д.), а возвращает количество дней в месяце

function getDays(year, month) {
  return (new Date(year, month, 1) - new Date(year, month - 1, 1)) / 1000 / 3600 / 24;
}
