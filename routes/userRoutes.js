const express = require("express");
const authController = require("../controllers/authController");
const loginMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", loginMiddleware, authController.getAllUsers);
router.post("/signup", authController.signUp);
router.post("/login", authController.login);

module.exports = router;