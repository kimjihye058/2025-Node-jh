const express = require("express");
const db = require("../models/Travel");
const Travel = require("../models/Travel");

const router = express.Router();

// 게시글 전체 목록을 보여줌
router.get("/", async (req, res) => {
  try {
    const travelList = await Travel.findAll({ attributes: ["id", "name"] });
    res.render("travel", { travelList });
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
    await Travel.create({ name });
    res.redirect("/travel");
  } catch (err) {
    console.error("데이터베이스 쿼리 실패", err);
    res.status(500).send("Internal Server Error");
  }
});

// 해당 게시글 내용 읽기
router.get("/:id", async (req, res) => {
  const travelID = req.params.id;
  try {
    const travel = await Travel.findByPk(travelID);
    if (!travel) {
      res.status(404).send("여행지를 찾을 수 없습니다");
      return;
    }
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
    const travel = await Travel.findByPk(travelID);
    if (!travel) {
      res.status(404).send("여행지를 찾을 수 없습니다");
      return;
    }
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
    const travel = await Travel.findByPk(travelID);
    if (!travel) {
      res.status(404).send("여행지를 찾을 수 없습니다.");
      return;
    }
    await travel.update({ name });
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
    const travel = await Travel.findByPk(travelID);
    if (!travel) {
      res.status(404).send("여행지를 찾을 수 없습니다.");
      return;
    }
    await travel.destroy();
    res.render("deleteSuccess");
  } catch (err) {
    console.error("DB 쿼리 실패", err);
    res.status(500).send("내부 서버 에러");
  }
});

module.exports = router;
