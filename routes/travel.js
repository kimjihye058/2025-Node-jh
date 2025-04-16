const express = require('express');
const db = require('../db');
const router = express.Router();

// 게시글 전체 목록을 보여줌
router.get('/', (req, res) => {
  const _query = 'SELECT id, name FROM travellist';
  db.query(_query, (err, results) => {
    if (err) {
      console.error('데이터베이스 쿼리 실패');
      res.status(500).send('Internal Server Error');
      return;
    }
    const travelList = results;
    res.render('travel', { travelList });
  });
});

// 게시글 추가 페이지로 이동
router.get('/add', (req, res) => {
  res.render('addTravel');
});

// 게시글을 추가
router.post('/', (req, res) => {
  const { name } = req.body;
  const _query = 'INSERT INTO travellist (name) VALUES (?)';
  db.query(_query, [name], (err, results) => {
    if (err) {
      console.error('데이터베이스 쿼리 실패');
      res.status(500).send('Internal Server Error');
      return;
    }
    res.redirect('/travel');
  });
});

// 해당 게시글 내용 읽기
router.get('/:id', (req, res) => {
  const travelID = req.params.id;
  const _query = 'SELECT * FROM travellist WHERE id = ?';
  db.query(_query, [travelID], (err, results) => {
    if (err) {
      console.error('DB 쿼리 실패', err);
      res.status(500).send('내부 서버 에러');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('여행지를 찾을 수 없습니다');
      return;
    }
    const travel = results[0];
    res.render('travelDetail', { travel });
  });
})

// 게시글 수정 페이지로 이동
router.get('/:id/edit', (req, res) => {
  const travelID = req.params.id;
  const _query = 'SELECT * FROM travellist WHERE id = ?';
  db.query(_query, [travelID], (err, results) => {
    if (err) {
      console.error('DB 쿼리 실패', err);
      res.status(500).send('내부 서버 에러');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('여행지를 찾을 수 없습니다');
      return;
    }
    const travel = results[0];
    res.render('editTravel', { travel });
  });
})

// 게시글 수정
router.put('/:id', (req, res) => {
  const travelID = req.params.id;
  const { name } = req.body;
  const _query = 'UPDATE travellist SET name = ? WHERE id = ?';
  db.query(_query, [name, travelID], (err, results) => {
    if (err) {
      console.error('DB 쿼리 실패', err);
      res.status(500).send('내부 서버 에러');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('여행지를 찾을 수 없습니다');
      return;
    }
    res.render('updateSuccess');
  });
})

// 게시글 삭제
router.delete('/:id', (req, res) => {
  const travelID = req.params.id;
  const _query = 'DELETE FROM travellist WHERE id = ?';
  db.query(_query, [travelID], (err, results) => {
    if (err) {
      console.error('DB 쿼리 실패', err);
      res.status(500).send('내부 서버 에러');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('여행지를 찾을 수 없습니다');
      return;
    }
    res.render('deleteSuccess');
  });
})

module.exports = router;
