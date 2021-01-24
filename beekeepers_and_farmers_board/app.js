const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

const app = express();

const routes = require('./routes/index');

export const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'beekeepers_and_farmers',
  password: 'password',
});

connection.connect((err) => {
  if (err) {
    return console.error('Error: ' + err.message);
  } else {
    console.log('Connection to MySQL Server successfully spawned');
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', routes);

const port = 8000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
