const express = require('express');
const mysql = require('mysql2');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'survey_express',
  password: 'password',
});

connection.connect(function (err) {
  if (err) {
    return console.error('Error: ' + err.message);
  } else {
    console.log('Connection to MySQL Server successfully spawned');
  }
});

app.set('view engine', 'hbs');
app.set('views', __dirname + '/static');

app.get('/', function (request, response) {
  connection.query('SELECT * FROM questions', function (errQuestions, resultsQuestions, fieldsQuestions) {
    connection.query(`SELECT * FROM answers WHERE question IN (${resultsQuestions[0]['id']})`, function (
      errAnswers,
      resultsAnswers,
      fieldsAnswers
    ) {
      response.render('survey.hbs', {
        question: resultsQuestions[0]['text'],
        answer1: resultsAnswers[0]['text'],
        answer2: resultsAnswers[1]['text'],
        answer3: resultsAnswers[2]['text'],
        answer4: resultsAnswers[3]['text'],
        answer1id: resultsAnswers[0]['id'],
        answer2id: resultsAnswers[1]['id'],
        answer3id: resultsAnswers[2]['id'],
        answer4id: resultsAnswers[3]['id'],
      });
    });
  });
});
app.get('/submit', function (request, response) {
  console.log(request.query);
  connection.query('UPDATE `answers` SET `choices` = `choices` + 1 WHERE id = ' + request.query.answer, function (
    errAnswers,
    resultsAnswers,
    fieldsAnswers
  ) {
    connection.query('SELECT choices FROM answers WHERE question IN (1)', function (err, results, fields) {
      console.log(results[1]);
      response.render('results.hbs', {
        resAnswer1: results[0]['choices'],
        resAnswer2: results[1]['choices'],
        resAnswer3: results[2]['choices'],
        resAnswer4: results[3]['choices'],
      });
    });
  });
});

const port = 8000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
