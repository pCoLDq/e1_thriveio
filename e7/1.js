// Создайте конструктор function Card(from, to){...},
// создающий объекты карточки со свойствами from, to и методом show(),
// возвращающим  свойства отдельного объекта в виде строки «from,to»,
// где на месте названий свойств будут их значения. Создайте переменную c1 с городами Екатеринбург и Москва

function Card(from, to) {
  this.from = from;
  this.to = to;

  this.show = function () {
    return `${this.from},${this.to}`;
  };
}

c1 = new Card('Екатеринбург', 'Москва');

// app.post('/login', function (request, response) {
//   const { username, password } = request.body;
//   const hashedPassword = getHashedPassword(password);
//   connection.query("SELECT * FROM users WHERE username = '" +  username + "' AND password = '" + hashedPassword + "';", (errUsers, resultsUsers, fieldsUsers) => {
//     // console.log(72, resultsUsers);
//     // if (
//     //   resultsUsers.find((user) => {
//     //     if (user.username === username && user.password === hashedPassword) {
//     //       // console.log(76, user.id);
//     //       const generateAuthToken = () => {
//     //         return crypto.randomBytes(30).toString('hex');
//     //       };
//     //       const authToken = generateAuthToken();
//     //       response.cookie('AuthToken', authToken);

//     //       const qry = "INSERT INTO `authTokens` (`token`, `user_id`) VALUES ('" + authToken + "', " + user.id + ')';
//     //       // console.log(99, qry);
//     //       connection.query(qry, () => {
//     //         console.log('token created');
//     //       });
//     //       response.redirect('/');
//     //       return true;
//     //     } else {
//     //       return false;
//     //     }
//     //   })
//     // ) {
//     // }
//     if (resultsUsers) {
//       const generateAuthToken = () => {
//         return crypto.randomBytes(30).toString('hex');
//       };
//       const authToken = generateAuthToken();
//       response.cookie('AuthToken', authToken)
//       const qry = "INSERT INTO `authTokens` (`token`, `user_id`) VALUES ('" + authToken + "', " + user.id + ')';
//       // console.log(99, qry);
//       connection.query(qry, () => {
//         console.log('token created');
//       });
//       response.redirect('/');
//     }
//     else {
//       response.render('login.hbs', {
//         message: 'Invalid username or password',
//       });
//       return;
//     }
//   });
// });
