const express=require ("express");
var router = express.Router();
const {getuserById,getuser}= require("../Controllers/user");
const {isSignedin,isAuthenticated} = require("../Controllers/authenticate");

router.param("userId",getuserById);
router.get("/user/:userId",isSignedin,isAuthenticated,getuser)
module.exports = router;