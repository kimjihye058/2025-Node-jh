// express 모듈을 불러옵니다.
const express = require("express");

// Express 애플리케이션을 생성합니다.
const app = express();

// JSON 바디를 파싱합니다.
app.use(express.json());

// 라우팅 파일을 불러옵니다.
const swagRoutes = require('./routes/swag');

// 라우팅 설정
// use를 사용하면 get이던, post던 다 받을 수 있음.
app.use('/swag', swagRoutes);

// 서버가 3000번 포트에서 요청을 기다리도록 설정
app.listen(3000, () => {
  console.log("서버가 http://localhost:3000에서 실행중입니다.");
});
