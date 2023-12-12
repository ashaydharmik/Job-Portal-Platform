const express = require("express");
const {serverHealth, registerUser, loginUser} = require("../Controller/userController");
const errorHandler = require("../Middleware/errorHandler");
const jobPosting = require("../Controller/jobController");
const validateToken = require("../Middleware/validateToken");



const router = express.Router();

router.get("/health", serverHealth )

router.post("/register", registerUser)

router.post("/login", loginUser)

router.post("/jobPost", validateToken, jobPosting)

//error handler middleware
router.use(errorHandler)

module.exports = router;