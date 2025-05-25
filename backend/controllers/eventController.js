const Event = require("../models/Event");

// GET - Fetch all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





module.exports = {
  getEvents,
};
