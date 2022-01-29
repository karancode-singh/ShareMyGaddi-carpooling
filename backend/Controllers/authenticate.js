import User from "../Models/user.js";
import checkAPIs from 'express-validator/check/index.js';
import jwt from 'jsonwebtoken';
import jexpressJwt from 'express-jwt';

const { check,validationResult} = checkAPIs;

const signout = (req,res)=>{
    res.clearCookie("token");
    res.json({
        message: "user signout"
    });
}

const signup = (req,res)=>{
    console.log("signup");
    const error = validationResult(req)
    console.log(error);
    if(!error.isEmpty()){
        return res.status(422).json({
            error:error.array()[0].msg
        })
    }
    const new_user = new User(req.body);
    new_user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err:"Not able to save user to Db"
            })
        }
        console.log("saved in db")
        res.json({
            name :user.name,
            email: user.email,
            id: user._id
        })
    })
    
}

const signin = (req,res)=>{
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
            return res.status(400).json({
                error:"Email and Password does not match"
            })

        }
        // create token and put in cookie
        const token = jwt.sign({_id:users._id},process.env.SECRET)
        // put in cookie
        res.cookie("token",token,{expire: new Date() +9999});
        // send response to front end
        const{_id,name,email,role} = users;
        return res.json(  
            {
                token,
                user:{_id,name,email,role}
            })
    })
    
}

export {signin,signout,signup}