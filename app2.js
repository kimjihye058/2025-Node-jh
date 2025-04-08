const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const { render } = require('ejs');

dotenv.config();
const app = express();      // 객체 생성

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
// __dirname : 현재 디렉토리의 절대경로
// path.join : 경로지정자(/ 나 \)를 운영체제에 맞추어 줌
app.set('views', path.join(__dirname, 'views'));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err)=>{
  if(err) {
    console.error('MySQL 연결 실패: ', err);
    return;
  }
  console.log("MySQL에 연결되었습니다.");
});

// 라우팅 설정
app.get('/', (req, res) => {
});

app.get('/travel', (req, res) => {
  const _query = 'SELECT id, name FROM travellist';
  db.query(_query, (err, results)=>{
    if(err) {
      console.error('데이터베이스 쿼리 실패:', err);
      res.status(500).send ('Internal Server Error');
      return;
    }
    const travelList = results;
    res.render('travel', {travelList});
  });
});

app.get('/travel/:id', (req, res) => {
  const travelId = req.params.id;
  const query = 'SELECT * FROM travelList WHERE id = ?';
  db.query(query, [travelId], (err, results) => {
    if(err) {
      console.error('데이터베이스 쿼리 실패: ', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('여행지를 찾을 수 없습니다.');
      return;
    }
    const travel = results[0];
    res.render('travelDetail', {travel})
  });
});

app.post('/travel', (req, res) => {
  const { name } = req.body;
  const _query = 'INSERT INTO travellist (name) VALUE (?)';
  db.query(_query, [name], (err, results) => {
    if(err) {
      console.error('데이터베이스 쿼리 실패: ', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.redirect('/travel');
  });
});

app.use((req, res) => {
});

app.listen(3001, () => {
  console.log("서버가 http://localhost:3001 에서 실행중입니다.");
});
