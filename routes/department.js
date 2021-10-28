const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");

const { createDepartment, list, getDepartment, listDepartments, update, deletedDepartment, addExpense } = require("../controllers/department");

router.post("/department", authCheck, adminCheck, createDepartment);
router.post("/departments", list);
router.get("/department/:slug", getDepartment);
router.get("/department/:count", listDepartments);
router.put("/department/:slug", authCheck, adminCheck, update);
router.put("/department/expense/:id", authCheck, adminCheck, addExpense);
router.delete("/delete-department", authCheck, adminCheck, deletedDepartment);


module.exports = router;