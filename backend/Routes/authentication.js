import express from "express";
import { check,validationResult} from 'express-validator';

var router = express.Router()

import {signout,signup,signin} from "../Controllers/authenticate.js";

router.post("/signup",[
    check("name","name should be atleast 5 characters long").isLength({min:5}),
    check("email","not a valid email").isEmail(),
    check("password","password should be atleast 3 char").isLength({min:3})

],signup)

router.post("/signin",[
    check("email","not a valid email").isEmail(),
    check("password","password should be atleast 3 char").isLength({min:3})

],signin)

router.get("/signout",signout)

export default router;