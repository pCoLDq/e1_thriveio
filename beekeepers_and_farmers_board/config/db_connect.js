const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'bkrps_frmrs_bb',
  password: 'ghj555666',
});

connection.connect((err) => {
  if (err) {
    return console.error('Error: ' + err.message);
  } else {
    console.log('Connection to MySQL Server successfully spawned');
  }
});

module.exports = connection;
