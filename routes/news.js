const express = require("express");
const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");
const { update, createNew, deletedNew, list, getNew, listNews, newsCount, listAll } = require("../controllers/news");

router.post("/new/:user_id", authCheck, adminCheck, createNew);
router.post("/news", list);
router.post("/newsL", listAll)
router.get('/news/total', newsCount);
router.get("/new/:slug", getNew);
router.get("/news/:count", listNews);
router.put("/new/:slug", authCheck, adminCheck, update);
router.delete("/delete-new/:slug", authCheck, adminCheck, deletedNew);




module.exports = router;