import express from "express";
import { isSignedin,isAuthenticated } from "../Controllers/authenticate.js";

import {getUserById,getuser,putuser} from "../Controllers/user.js";

var router = express.Router()

router.param("userid",getUserById)
router.get("/user/:userid",isSignedin,isAuthenticated,getuser)
router.put("/user/:userid",isSignedin,isAuthenticated,putuser)

export default router;

