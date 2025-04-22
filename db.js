const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// .env로 민감한 데이터를 이동
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const db = pool.promise();

module.exports = db;
