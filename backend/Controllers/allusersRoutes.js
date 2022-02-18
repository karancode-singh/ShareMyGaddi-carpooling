var u = require("../Models/user")
exports.allusersRoutes=(req,res)=>{
    u.find().exec((err,ud)=>{
        if(err){
            res.status(400).json({
                error:"no user found"
            })
        }
        res.json(ud)
    })
}