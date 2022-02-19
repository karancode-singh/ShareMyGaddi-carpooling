import  u from "../Models/user.js";

const allusersRoutes=(req,res)=>{
    u.find().exec((err,ud)=>{
        if(err){
            res.status(400).json({
                error:"no user found"
            })
        }
        res.json(ud)
    })
}

export {allusersRoutes}