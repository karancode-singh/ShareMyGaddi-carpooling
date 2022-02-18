/* temporary route to get all the user information*/ 
var express = require("express");
var router = express.Router()
var {allusersRoutes} = require("../Controllers/allusersRoutes")
router.get("/users",allusersRoutes)

module.exports = router;