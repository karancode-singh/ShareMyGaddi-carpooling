const express = require("express");
const { isSignedin } = require("../Controllers/authenticate");

var router = express.Router()
const { drive, ride, cancelTrip,drivedone } = require("../Controllers/trip.js");

router.post("/drive", isSignedin, drive)
router.post("/ride", isSignedin, ride)
router.delete("/trip", isSignedin, cancelTrip)
//router.get("/histroy",isSignedin,histroy)
router.get("/drive/done",isSignedin,drivedone)
module.exports = router;
