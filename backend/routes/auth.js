const express = require("express");
const { testAuth } = require("../controllers/authController");

const router = express.Router();

router.get("/test", testAuth);

module.exports = router;
