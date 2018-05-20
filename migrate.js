const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
});

connection.connect();
connection.query('DROP TABLE IF EXISTS pastes;');
connection.query(`
    CREATE TABLE pastes (
        id INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY(id),
        content LONGTEXT,
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`);

connection.end();
