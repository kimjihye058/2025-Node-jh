const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const travelRoutes = require('./routes/travel');
const port = 3001;


const app = express();


app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.set('view engine', 'ejs');
// __dirname : 현재 파일이 속한 절대경로
// path.join을 사용하면 운영체제에 맞추어 경로 구분자(/, \)를 알아서 정해준다
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
  res.render('home');
});


app.use('/travel', travelRoutes);


// use:모든 method에 대해, 경로가 없으면?: 모든 경로에 대해
app.use((req, res)=> {
  res.status(404).send('404 NOT FOUND');
});


app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
