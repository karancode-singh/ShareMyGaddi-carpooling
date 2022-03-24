const User = require("../Models/user.js");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const dotenv = require("dotenv");

dotenv.config()

exports.signout = (req, res) => {
   
    if (Object.keys(req.cookies) != 'tokken') {
        res.statusMessage = "user already signedout";
        return res.status(400).end();
    }
    // need to check how to check out how to perform system testing for signout
    res.clearCookie("tokken")
    res.status(200).json({
        message: "user signout"
    });
}

exports.signup = (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        res.statusMessage = error.array()[0].msg;
        return res.status(422).end();
    }
    const new_user = new User(req.body);
    new_user.save((err, user) => {
        if (err) {
            res.statusMessage = "User with this email already exists";
            return res.status(400).end();
        }
        // create token and put in cookie
        const token = jwt.sign({ _id: user._id }, process.env.SECRET)
        // put in cookie
        res.cookie("tokken", token, { expire: new Date() + 9999 });
        // send response to front end
        const { _id, name, lastname, email, role, active_trip } = user;
        res.status(200);
        res.json({
            token,
            user: { _id, name: name + ' ' + lastname, email, role, active_trip },
        });
        return res
    })

}

exports.signin = (req, res) => {
    const { email, password } = req.body;
    const error = validationResult(req)
    if (!error.isEmpty()) {
        res.statusMessage = error.array()[0].msg;
        return res.status(422).end();
    }

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            res.statusMessage = "User email does not exist";
            return res.status(400).end();
        }
        if (!user.authenticate(password)) {
            res.statusMessage = "Email and Password does not match"
            return res.status(401).end();
        }
        // create token and put in cookie
        const token = jwt.sign({ _id: user._id }, process.env.SECRET)
        // put in cookie
        res.cookie("tokken", token, { expire: new Date() + 9999 });
        
        // send response to front end
        const { _id, name, lastname, email, role, active_trip } = user;
        res.status(200);
        res.json({
            token,
            user: { _id, name: name + ' ' + lastname, email, role, active_trip },
        });
        return res
    })

}

exports.isSignedin = (req, res, next) => {
    let token = req.get('coookie')
    if (!token && req.headers['authorization']) {
        //another working solution BEGIN
        const bearerHeader = req.headers['authorization'];
        if (bearerHeader) {
            const bearer = bearerHeader.split(' ');
            token = bearer[2]; //This has to be 2 please donot update me
        }
        //another working solution END
    }
    if (token && token != 'undefined') {
        jwt.verify(token, process.env.SECRET, (err, decodestring) => {
            if (err) {
                console.log(err)
                res.statusMessage = "User authentication expired";
                return res.status(401).end();
            }
            else {
                req.auth = decodestring
                next()
            }
        })
    }
    else {
        res.statusMessage = "User not signed in";
        return res.status(401).end();
    }
}


// exports.isAuthenticated = (req, res, next) => {
//     let check = req.profile && req.auth && req.profile._id == req.auth._id;
//     //console.log(req.profile._id)
//     //console.log(req.auth)
//     if (!check) {
//         return res.status(400).json({
//             error: "Access denied......"
//         })
//     }
//     next()
// }