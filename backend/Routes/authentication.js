import express from "express";
import checkAPIs from 'express-validator/check/index.js';

const { check,validationResult} = checkAPIs;

var router = express.Router()

import {signout, signup, signin, isSignedin} from "../Controllers/authenticate.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - lastname
 *         - email
 *         - Password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the User
 *         Name:
 *           type: string
 *           description: First Name of User with Max length of 32
 *         LastName:
 *           type: string
 *           description: First Name of User with Max length of 32
 *         Email:
 *           type: string
 *           description: Email id of user
 *         PhoneNumber:
 *           type: Number
 *           description: Contains Phone Number of User
 *         Encry_Password:
 *           type: string
 *           description: Contains encrypted passwrod of user
 *         Salt:
 *           type: string
 *           description: Contains encrypted Random generated string for encrypting password
 *         User profile photo:
 *           type: Buffer
 *           description: User Photo stored in backend.
 *         Rides:
 *           type: Array
 *           description: Array storing user rides.
 *       example:
 *          Name: harry
 *          LastName: Taneja
 *          Email: tanejaharry@gmail.com
 *          PhoneNumber: 657 566 5678
 *          Encry_Password: b4dc5cd
 *          Salt: 3cf257hjdfs
 *         
 *         
 */
/**
  * @swagger
  * tags:
  *   name: Signout
  *   description: Signout API
  */

/**
 * @swagger
 *  /api/signout:
 *   get:
 *     summary: Signout
 *     tags: [Signout]
*     responses:
 *       200:
 *         description: Signing successfull ...
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *      
 *   
 *              
 */

/**
 * @swagger
 *  /api/signin:
 *   post:
 *     summary: Sigin
 *     tags: [Signin]
 *     responses:
 *       200:
 *         description: Signing successfull ...
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The User was not found
 *       422:
 *          description: Input parametes entered are wrong...
 *       400:
 *          description: Entered Email does not exists...
 *       401:
 *          description: Entered Email or Entered password is incorrect...
 *              
 */

/**
 * @swagger
 *  /api/signup:
 *   post:
 *     summary: SigUp
 *     tags: [SignUp]
 *     responses:
 *       200:
 *         description: Signing successfull ...
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       
 *       422:
 *          description: Input parametes entered are wrong...
 *       400:
 *          description: Entered Email does not exists...
 *       
 *              
 */
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
