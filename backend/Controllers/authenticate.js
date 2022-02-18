const User = require("../Models/user")
const { check , validationResult} = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
const user = require("../Models/user");
require('dotenv').config()

exports.signout = (req,res)=>{
    res.clearCookie("token");
    res.status(200).json({
        message: "user signout"
    });
}

exports.signup = (req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(422).json({
            error:error.array()[0].msg
        })
    }
    const user = new User(req.body)
    
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err:"Not able to save user to Db"
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
                error:"User email does not exits"
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
        res.cookie("token",token,{expire: new Date() +9999});
        // send response to front end
        const{_id,name,email,role} = users;
        res.status(200)
        return res.json(  
            {
                token,
                user:{_id,name,email,role}
            })
    })
    
}

// is signed in route

exports.isSignedin= expressJwt({
    secret:process.env.SECRET,
    algorithms: ['sha1', 'RS256', 'HS256'],
    userProperty:"auth"

})

exports.isAuthenticated = (req,res,next) => {
    let check = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!check){
        return res.status(400).json({
            error:"Access denied"
        })
    }
    next()
}

