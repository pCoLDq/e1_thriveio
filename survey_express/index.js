const express = require('express');
const mysql = require('mysql2');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { triggerAsyncId } = require('async_hooks');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'survey_express',
  password: 'ghj555666',
});

const authRouter = express.Router();
const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
};

connection.connect(function (err) {
  if (err) {
    return console.error('Error: ' + err.message);
  } else {
    console.log('Connection to MySQL Server successfully spawned');
  }
});

app.set('view engine', 'hbs');
app.set('views', __dirname + '/static');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/register', function (request, response) {
  const { username, password, confPassword } = request.body;
  if (password === confPassword) {
    connection.query('SELECT * FROM users', (errUsers, resultsUsers, fieldsUsers) => {
      if (resultsUsers.find((user) => user.username === username)) {
        response.render('register.hbs', {
          message: 'Username already registered',
        });
        return;
      }
    });

    const hashedPassword = getHashedPassword(password);

    connection.query(
      "INSERT INTO `users` (`username`, `password`) VALUES ('" + username + "', '" + hashedPassword + "')",
      (errUsers, resultsUsers, fieldsUsers) => {
        console.log('user registered');
      }
    );

    response.render('login.hbs', {
      message: 'Registration Complete. Please login to continue.',
    });
  } else {
    response.render('register.hbs', {
      message: 'Passwords does not match.',
    });
  }
});
app.post('/login', function (request, response) {
  const { username, password } = request.body;
  const hashedPassword = getHashedPassword(password);
  connection.query('SELECT * FROM users', (errUsers, resultsUsers, fieldsUsers) => {
    // console.log(72, resultsUsers);
    if (
      resultsUsers.find((user) => {
        if (user.username === username && user.password === hashedPassword) {
          // console.log(76, user.id);
          const generateAuthToken = () => {
            return crypto.randomBytes(30).toString('hex');
          };
          const authToken = generateAuthToken();
          response.cookie('AuthToken', authToken);

          const qry = "INSERT INTO `authTokens` (`token`, `user_id`) VALUES ('" + authToken + "', " + user.id + ')';
          // console.log(99, qry);
          connection.query(qry, () => {
            console.log('token created');
          });
          response.redirect('/');
          return true;
        } else {
          return false;
        }
      })
    ) {
    } else {
      response.render('login.hbs', {
        message: 'Invalid username or password',
      });
      return;
    }
  });
});

app.get('/register', function (request, response) {
  response.render('register.hbs');
});
app.get('/login', function (request, response) {
  response.render('login.hbs');
});

app.get('/', function (request, response) {
  let isAuthenticated = false;
  let user = {};
  connection.query('SELECT * FROM authTokens', function (errTokens, resultsTokens, fieldsTokens) {
    // console.log(118, resultsTokens);
    if (
      resultsTokens.find((token) => {
        if (token.token === request.cookies['AuthToken']) {
          console.log(122, token);
          isAuthenticated = true;
          connection.query(
            'SELECT * FROM users WHERE id IN (' + token.user_id + ')',
            (errUsers, resultsUsers, fieldsUsers) => {
              console.log(131, resultsUsers);
              user = resultsUsers[0];
            }
          );
          return true;
        }
      })
    ) {
    }
  });
  connection.query('SELECT * FROM questions', function (errQuestions, resultsQuestions, fieldsQuestions) {
    connection.query(`SELECT * FROM answers WHERE question IN (${resultsQuestions[0]['id']})`, function (
      errAnswers,
      resultsAnswers,
      fieldsAnswers
    ) {
      // console.log(143, request.cookies['AuthToken'], user.username);
      response.render('survey.hbs', {
        isAuthenticated,
        username: user.username,
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
  connection.query('UPDATE `answers` SET `choices` = `choices` + 1 WHERE id = ' + request.query.answer, function (
    errAnswers,
    resultsAnswers,
    fieldsAnswers
  ) {
    connection.query('SELECT choices FROM answers WHERE question IN (1)', function (err, results, fields) {
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
