const express = require("express");
const {serverHealth, registerUser, loginUser} = require("../Controller/userController");



const router = express.Router();

router.get("/health", serverHealth)

router.post("/register", registerUser)

router.post("/login", loginUser)

module.exports = router;