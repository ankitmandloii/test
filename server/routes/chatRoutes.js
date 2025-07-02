const express = require("express");
const router = express.Router();
const { getUserList, getChat } = require("../controllers/chatController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.get("/users", authMiddleware, getUserList);
router.get("/messages/:userId", authMiddleware, getChat);

module.exports = router;
