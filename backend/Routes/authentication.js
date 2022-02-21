import express from "express";
import { check,validationResult} from 'express-validator';

var router = express.Router()

import {signout, signup, signin, isSignedin} from "../Controllers/authenticate.js";




router.post("/signup",[
    check("name","name should be atleast 2 characters long").isLength({min:2}),
    check("email","name should be atleast 5 characters long").isEmail(),
    check("password","Should be atleast 3 char").isLength({min:3})

],signup)



router.post("/signin",[
    check("email","name should be atleast 5 characters long").isEmail(),
    check("password","Should be atleast 3 char").isLength({min:3})

],signin)


router.get("/signout",signout)

router.get("/test",isSignedin,(req,res)=>{
res.json(req.auth);
})
export default router;
