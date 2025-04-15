const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// .env로 민감한 데이터를 이동
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


db.connect(err => {
  if (err) {
    console.err('MySQL 연결 실패:', err);
    return;
  }
  console.log('MySQL에 연결되었습니다.');
});


module.exports = db;
