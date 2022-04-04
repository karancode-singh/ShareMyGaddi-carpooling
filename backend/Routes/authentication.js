const express = require("express");
//import express from "express";
const { check, validationResult } = require('express-validator');
//import { check,validationResult} from 'express-validator';
// const distance = require('distance-matrix-api')
//const distance = require('google-distance-matrix')

var router = express.Router()
const { signout, signup, signin, isSignedin,delete_user } = require("../Controllers/authenticate.js");

//import {signout, signup, signin, isSignedin} from "../Controllers/authenticate.js";

router.post("/signup", [
    check("name", "name should be atleast 2 characters long").isLength({ min: 2 }),
    check("email", "name should be atleast 5 characters long").isEmail(),
    check("password", "Should be atleast 3 char").isLength({ min: 3 })

], signup)


/*trail code 

 router.post('/',(req,res,next)=>{
    const origins = ["NEW YORK"]
    const dests=["University of WATERLOO"]
    const mode="driving"
    distance.key('AlphaDMAXaCkwt9xfFLu13thGWwjJ1RE2LNZ1UzV')
    distance.matrix(origins,dests,mode,(err,distance)=>{
    if(err)
    {
        console.log(err);
        return;
    }
    if (distance.status == 'OK') {
        for (var i=0; i < origins.length; i++) {
            for (var j = 0; j < dests.length; j++) {
                var origin = distance.origin_addresses[i];
                console.log(origin)
                var destination = distance.destination_addresses[j];
                console.log(dests)
                console.log(distance.rows[i])
                console.log(distance.rows[i].elements[j])
                // if (distance.rows[0].elements[j].status == 'OK') {
                //     var dista = distance.rows[i].elements[j].distance.text;
                //     console.log('Distance from ' + origin + ' to ' + destination + ' is ' + dista);
                // } else {
                //     console.log(destination + ' is not reachable by land from ' + origin);
                // }
            }
        }
    }
})
 })*/
router.post("/signin", [
    check("email", "name should be atleast 5 characters long").isEmail(),
    check("password", "Should be atleast 3 char").isLength({ min: 3 })

], signin)

router.delete("/delete",isSignedin,delete_user);
router.get("/signout", signout)

// router.get("/test",isSignedin,(req,res)=>{
// res.json(req.auth);
// })
module.exports = router;
//export default router;
