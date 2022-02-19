/* temporary route to get all the user information*/ 
import express from "express";
import {allusersRoutes} from "../Controllers/allusersRoutes.js";

var router = express.Router()

router.get("/users",allusersRoutes)

export default router;