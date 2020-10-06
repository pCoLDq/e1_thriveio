// Напишите функцию calendar(year,month),
// которая принимает два параметра — номер месяца и год, а
// возвращает разметку календаря HTML на указанный месяц.

function calendar(year, month) {
  let date = new Date(year, month, 1);
  let mark = `<table bordercolor="#000" border="1">`;

  mark += `<caption>${date.toDateString('ru')}</caption>`;
  mark += `<tr><th>Пн</th> <th>Вт</th> <th>Ср</th> <th>Чт</th> <th>Пт</th> <th>Сб</th> <th>Вс</th></tr>`;

  while (date.getMonth() == month) {
    mark += '<tr>';
    if (date.getDate() == 1) {
      for (let i = 0; i < date.getDay() - 1; i++) {
        mark += `<td> </td>`;
      }
      while (true) {
        mark += `<td>${date.getDate()}</td>`;
        if (date.getDay() == 0) {
          date.setDate(date.getDate() + 1);
          break;
        }
        date.setDate(date.getDate() + 1);
      }
      continue;
    }
    while (true) {
      mark += `<td>${date.getDate()}</td>`;
      date.setDate(date.getDate() + 1);
      if (date.getDay() == 0) {
        if (date.getMonth() != month) {
          mark += `<td> </td>`;
          break;
        }
        mark += `<td>${date.getDate()}</td>`;
        date.setDate(date.getDate() + 1);
        break;
      }
    }
    mark += '</tr>';
  }

  mark += `</table>`;
  return mark;
}
document.write(calendar(2020, 9));
