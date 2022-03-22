const express = require("express");
const { isSignedin } = require("../Controllers/authenticate");

var router = express.Router()
const { drive, ride, cancelTrip, tripDone, tripHistory,tripDriver } = require("../Controllers/trip.js");

router.post("/trip/drive", isSignedin, drive)
router.post("/trip/ride", isSignedin, ride)
router.delete("/trip", isSignedin, cancelTrip)
router.post("/trip/done", isSignedin, tripDone)
router.get("/trip/history", isSignedin, tripHistory)
router.get("/trip/isDriver", isSignedin, tripDriver)
module.exports = router;
