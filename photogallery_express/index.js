const express = require('express');
const mysql = require('mysql2');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'photogallery_express',
  password: 'password',
});

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
};

connection.connect((err) => {
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

app.post('/register', (request, response) => {
  const { username, password, confPassword } = request.body;
  if (password === confPassword) {
    connection.execute('SELECT * FROM users WHERE username = ?;', [username], (errUsers, resultsUsers, fieldsUsers) => {
      if (resultsUsers[0] != undefined) {
        response.render('register.hbs', {
          message: 'Username already registered',
        });
        return;
      }
      const hashedPassword = getHashedPassword(password);

      connection.execute(
        'INSERT INTO `users` (`username`, `password`) VALUES (?, ?)',
        [username, hashedPassword],
        (errUsers, resultsUsers, fieldsUsers) => {
          console.log('user registered');
        }
      );

      response.render('login.hbs', {
        message: 'Registration Complete. Please login to continue.',
      });
    });
  } else {
    response.render('register.hbs', {
      message: 'Passwords does not match.',
    });
  }
});

app.post('/login', (request, response) => {
  const { username, password } = request.body;
  const hashedPassword = getHashedPassword(password);

  connection.execute(
    'SELECT * FROM users WHERE username = ? AND password = ?;',
    [username, hashedPassword],
    (errUsers, resultsUsers, fieldsUsers) => {
      let user = resultsUsers[0];
      if (user != undefined) {
        // console.log(76, user);
        const generateAuthToken = () => {
          return crypto.randomBytes(30).toString('hex');
        };
        const authToken = generateAuthToken();
        response.cookie('AuthToken', authToken);
        connection.execute('INSERT INTO `authtokens` (`token`, `user_id`) VALUES (?, ?)', [authToken, user.id], () => {
          console.log('token created');
        });
        response.redirect('/');
      } else {
        response.render('login.hbs', {
          message: 'Invalid username or password',
        });
        return;
      }
    }
  );
});

app.get('/photo_db/:fn', (request, response) => {
  response.sendFile(path.resolve('photo_db/' + request.params.fn).replace(/\//g, '\\'));
});
app.get('/details/:fn', (request, response) => {
  connection.execute(
    'SELECT description FROM photos WHERE filename = ?',
    [request.params.fn],
    (errDesc, resultsDesc, fieldsDesc) => {
      response.render('details.hbs', {
        description: resultsDesc[0]['description'],
      });
    }
  );
});

app.get('/register', (request, response) => {
  response.render('register.hbs');
});
app.get('/login', (request, response) => {
  response.render('login.hbs');
});

app.use(function (request, response, next) {
  let isAuthenticated = false;
  connection.query('SELECT * FROM authtokens', (errTokens, resultsTokens, fieldsTokens) => {
    resultsTokens.find((token) => {
      if (token.token === request.cookies['AuthToken']) {
        isAuthenticated = true;
        connection.execute(
          'SELECT * FROM users WHERE id = ?',
          [token.user_id],
          (errUsers, resultsUsers, fieldsUsers) => {
            request.user = resultsUsers[0];
            request.isAuthenticated = isAuthenticated;
            console.log(request.user);
            next();
          }
        );
      }
    });
  });
});

app.get('/', (request, response) => {
  connection.query('SELECT * FROM photos', (errPhotos, resultsPhotos, fieldsPhotos) => {
    let fnames = [];
    for (let i = 0; i < resultsPhotos.length; i++) {
      fnames.push(resultsPhotos[i]['filename']);
    }
    console.log(fnames);
    response.render('main.hbs', {
      isAuthenticated: request.isAuthenticated,
      username: request.user.username,
      fnames,
    });
  });
});

app.post(
  '/submit_upload',
  upload.single('image_upload'),
  [
    // validation ...
  ],
  (request, response) => {
    let userUploads = fs
      .readdirSync('photo_db')
      .filter(function (fn) {
        return fn.split('_')[0] == request.user.id;
      })
      .sort();
    console.log(188, userUploads);
    let fileID =
      userUploads.length == 0 ? '1' : String(+userUploads[userUploads.length - 1].split('_')[1].split('.')[0] + 1);
    let filename = `${request.user.id}_${fileID}.${request.file.mimetype.split('/')[1]}`;
    connection.execute(
      'INSERT INTO `photos` (`filename`, `description`) VALUES (?, ?)',
      [filename, request.body.description],
      (errAnswers, resultsAnswers, fieldsAnswers) => {
        sharp(request.file.buffer)
          .resize(300, 300)
          .toFile(`photo_db/${filename}`, (err, info) => {
            if (err) throw err;
            console.log(info);
            response.redirect('/');
          });
      }
    );
  }
);

const port = 8000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
