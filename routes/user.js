const express = require("express");
const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");
const { getUser, getUsers, updateProperty } = require("../controllers/user");

router.post("/users", authCheck, adminCheck, getUsers);
router.get("/user/:user_id", getUser);
router.put("/user-property/:_id", updateProperty);

module.exports = router;