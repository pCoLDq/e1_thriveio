const mysql = require('mysql2');

const connection = mysql
  .createConnection({
    host: 'localhost',
    user: 'root',
    database: 'bkrps_frmrs_bb',
    password: 'password',
  })
  .promise();

console.log('Connection to MySQL Server successfully spawned');

module.exports = connection;
