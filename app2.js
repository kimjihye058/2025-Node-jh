const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express();      // 객체 생성

app.set('view engine', 'ejs');
// __dirname : 현재 디렉토리의 절대경로
// path.join : 경로지정자(/ 나 \)를 운영체제에 맞추어 줌
app.set('views', path.join(__dirname, 'views'));

// 여행지 목록 데이터
const travelList = ['뉴옥', '빠리', '우리집', '도쿄'];

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mirim1',
  database: 'traveldb'
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
  res.render('travel', {travelList});
});

app.use((req, res) => {
});

app.listen(3001, () => {
  console.log("서버가 http://localhost:3001 에서 실행중입니다.");
});
