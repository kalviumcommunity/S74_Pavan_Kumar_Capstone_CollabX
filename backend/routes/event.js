const express = require("express");
const {
  getEvents,
  createEvent,
  updateEvent
} = require("../controllers/eventController");

const router = express.Router();

router.get("/", getEvents);
router.post("/", createEvent);
router.put("/:id", updateEvent);


module.exports = router;
