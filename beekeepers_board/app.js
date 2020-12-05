const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

const app = express();

const routes = require('./routes/index');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'photogallery_express',
  password: 'password',
});

connection.connect((err) => {
  if (err) {
    return console.error('Error: ' + err.message);
  } else {
    console.log('Connection to MySQL Server successfully spawned');
  }
});

export { connection };

app.set('view engine', 'hbs');
app.set('views', __dirname + '/static');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', routes);

const port = 8000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
