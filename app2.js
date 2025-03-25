const express = require('express');
const path = require('path');

const app = express();      // 객체 생성

app.set('view engine', 'ejs');
// __dirname : 현재 디렉토리의 절대경로
// path.join : 경로지정자(/ 나 \)를 운영체제에 맞추어 줌
app.set('views', path.join(__dirname, 'views'));

// 여행지 목록 데이터
const travelList = ['뉴옥', '빠리', '우리집', '도쿄'];

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
