// Создайте переменные m и n. В m поместите произвольное числовое значение.
//  Напишите оператор ветвления if так, чтобы если m было больше 50, то в переменную n помещалось слово «большое»,
//  иначе — слово «маленькое».

const m = Math.floor(Math.random() * 100);
let n;

if (m > 50) {
  n = 'большое';
} else {
  n = 'маленькое';
}