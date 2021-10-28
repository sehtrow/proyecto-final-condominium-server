const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");

const { createCommonExpense, list, getCommonExpense, listCommonExpenses, update, deleteCommonExpense, paidExpense} = require("../controllers/commonExpenses");

router.post("/expense", authCheck, adminCheck, createCommonExpense);
router.post("/expenses", authCheck, list);
router.get("/expense/:id", authCheck, getCommonExpense);
router.get("/expenses/:count", authCheck, listCommonExpenses);
router.put("/expense/:slug", authCheck, adminCheck, update);
router.put("/expense/paid/:id", authCheck,paidExpense);
router.delete("/delete-expense/:id", authCheck, adminCheck, deleteCommonExpense);


module.exports = router;