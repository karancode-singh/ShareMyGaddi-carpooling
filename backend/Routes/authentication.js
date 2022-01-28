var express = require('express')
const { check,validationResult} = require('express-validator');
var router = express.Router()
const {signout,signup,signin} = require("../Controllers/authenticate.js")

router.post("/signup",[
    check("name","name should be atleast 5 characters long").isLength({min:5}),
    check("email","name should be atleast 5 characters long").isEmail(),
    check("password","Should be atleast 3 char").isLength({min:3})

],signup)

router.post("/signin",[
    check("email","name should be atleast 5 characters long").isEmail(),
    check("password","Should be atleast 3 char").isLength({min:3})

],signin)

router.get("/signout",signout)

module.exports = router;