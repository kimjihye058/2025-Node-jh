const express = require("express");
const db = require("../db");
const router = express.Router();

// 게시글 전체 목록을 보여줌
router.get("/", async (req, res) => {
  try {
    const _query = "SELECT id, name FROM travellist";
    const [results] = await db.query(_query);
    res.render("travel", { travelList: results });
  } catch (err) {
    console.error("데이터베이스 쿼리 실패", err);
    res.status(500).send("Internal Server Error");
  }
});

// 게시글 추가 페이지로 이동
router.get("/add", (req, res) => {
  res.render("addTravel");
});

// 게시글을 추가
router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const _query = "INSERT INTO travellist (name) VALUES (?)";
    await db.query(_query, [name]);
    res.redirect("/travel");
  } catch {
    console.error("데이터베이스 쿼리 실패", err);
    res.status(500).send("Internal Server Error");
  }
});

// 해당 게시글 내용 읽기
router.get("/:id", async (req, res) => {
  const travelID = req.params.id;
  try {
    const _query = "SELECT * FROM travellist WHERE id = ?";
    const [results] = await db.query(_query, [travelID]);
    if (results.length === 0) {
      res.status(404).send("여행지를 찾을 수 없습니다");
      return;
    }
    const travel = results[0];
    res.render("travelDetail", { travel });
  } catch (err) {
    console.error("DB 쿼리 실패", err);
    res.status(500).send("내부 서버 에러");
  }
});

// 게시글 수정 페이지로 이동
router.get("/:id/edit", async (req, res) => {
  const travelID = req.params.id;
  try {
    const _query = "SELECT * FROM travellist WHERE id = ?";
    const [results] = await db.query(_query, [travelID]);
    if (results.length === 0) {
      res.status(404).send("여행지를 찾을 수 없습니다");
      return;
    }
    const travel = results[0];
    res.render("editTravel", { travel });
  } catch (err) {
    console.error("DB 쿼리 실패", err);
    res.status(500).send("내부 서버 에러");
  }
});

// 게시글 수정
router.put("/:id", async (req, res) => {
  const travelID = req.params.id;
  const { name } = req.body;
  try {
    const _query = "UPDATE travellist SET name = ? WHERE id = ?";
    await db.query(_query, [name, travelID]);
    res.render("updateSuccess");
  } catch (err) {
    console.error("DB 쿼리 실패", err);
    res.status(500).send("내부 서버 에러");
  }
});

// 게시글 삭제
router.delete("/:id", async (req, res) => {
  const travelID = req.params.id;
  try {
    const _query = "DELETE FROM travellist WHERE id = ?";
    await db.query(_query, [travelID]);
    res.render("deleteSuccess");
  } catch (err) {
    console.error("DB 쿼리 실패", err);
    res.status(500).send("내부 서버 에러");
  }
});

module.exports = router;
