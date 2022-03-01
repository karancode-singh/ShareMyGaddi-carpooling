const User = require("../Models/user.js");
//import User from "../Models/user.js";
const { check,validationResult} = require('express-validator');
//import { check,validationResult} from 'express-validator';
const jwt = require('jsonwebtoken');
//import jwt from 'jsonwebtoken';
const expressJwt= require('express-jwt');
//import expressJwt from 'express-jwt';
//import dotenv from "dotenv";
const dotenv= require("dotenv");

dotenv.config()

exports.signout = (req,res)=>{
    //console.log(req)
    if(Object.keys(req.cookies) != 'tokken' )
    {
        return res.status(400).json({
        message: "user already signedout"});
    
    }
    // need to check how to check out how to perform system testing for signout
    res.clearCookie("tokken")
    res.status(200).json({
        message: "user signout"
    });
}

exports.signup = (req,res)=>{
    const error = validationResult(req)
    //console.log(req);
    if(!error.isEmpty()){
        //console.log(error.array()[0].msg)
        return res.status(422).json({
            error:error.array()[0].msg
        })
    }
    const new_user = new User(req.body);
    new_user.save((err,user)=>{
        
        if(err){
            return res.status(400).json({
                err:"User with this Email already regsitered with system",
            })
        }
        res.status(200);
            res.json({
            name :user.name,
            email: user.email,
            id: user._id
        })
    })
    
}

exports.signin = (req,res)=>{
    const {email,password} = req.body;
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(422).json({
            error:error.array()[0].msg
        })
    }
    
    User.findOne({email},(err,users)=>{
        if(err || !users ){
            return res.status(400).json({
                error:"User email does not exist"
            })
        }
        //console.log(users.authenticate(password))
        if(!users.authenticate(password)){
            return res.status(401).json({
                error:"Email and Password does not match"
            })

        }
        // create token and put in cookie
        const token = jwt.sign({_id:users._id},process.env.SECRET)
        // put in cookie
        res.cookie("tokken",token,{expire: new Date() +9999});
        //console.log(res);
        // send response to front end
        const{_id,name,email,role} = users;
        res.status(200)
        
        res.json(  
            {
                token,
                user:{_id,name,email,role}
            })
        
        return res    
    })
    
}


// exports.isSignedin= expressJwt({
//     secret:process.env.SECRET,
//     algorithms: ['sha1', 'RS256', 'HS256'],
//     userProperty:"auth"
// })

exports.isSignedin= (req,res,next)=>{
    let token = Object.values(req.cookies)[0]; // check in other system
    if(token){
        jwt.verify(token,process.env.SECRET,(err,decodestring)=>{
            if(err)
            {
                console.log(err)
                return res.status(400).json({
                    error:"User seems to be incorrect"
                })
            }
            else{
                req.auth=decodestring
                //console.log(decodestring)
                next()
            }
        })
    }
    else{

                return res.status(400).json({
                    error:"User not signed in....."
                })
    }
}


exports.isAuthenticated = (req,res,next) => {
    let check = req.profile && req.auth && req.profile._id == req.auth._id;
    //console.log(req.profile._id)
    //console.log(req.auth)
    if(!check){
        return res.status(400).json({
            error:"Access denied......"
        })
    }
    next()
}

//export {signin, signout, signup, isSignedin, isAuthenticated}
