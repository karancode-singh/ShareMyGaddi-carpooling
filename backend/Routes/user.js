var express = require("express");
const { isSignedin,isAuthenticated } = require("../Controllers/authenticate.js");
var router = express.Router()
const {getUserById,getuser,putuser} = require("../Controllers/user.js");

router.param("userid",getUserById)
router.get("/user/:userid",isSignedin,isAuthenticated,getuser)
router.put("/user/:userid",isSignedin,isAuthenticated,putuser)
module.exports =router;

