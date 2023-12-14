const express = require("express");
const {serverHealth, registerUser, loginUser} = require("../Controller/userController");
const errorHandler = require("../Middleware/errorHandler");
const {jobPosting, updateJobPost, getJobPost, singleJobPost} = require("../Controller/jobController");
const validateToken = require("../Middleware/validateToken");



const router = express.Router();

router.get("/health", serverHealth )

router.post("/register", registerUser)

router.post("/login", loginUser)

router.post("/jobPost", validateToken, jobPosting)

router.put("/updateJobPost", updateJobPost)

router.get("/getJobPost", getJobPost)

router.get("/fetchJobPost", singleJobPost)

//error handler middleware
router.use(errorHandler)

module.exports = router;