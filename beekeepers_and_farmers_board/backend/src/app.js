require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,PATCH,POST,DELETE',
    credentials: true,
  })
);

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const routes = require('./routes/index');

app.use('/', routes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
