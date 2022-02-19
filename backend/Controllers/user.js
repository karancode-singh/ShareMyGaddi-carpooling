import User from "../Models/user.js";

const getUserById= (req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err){
            return res.status(400).json({
                error:"User not found"
            })
        }
        req.profile=user
        next();
    })
}

const getuser=(req,res)=>{
    req.profile.salt=undefined
    req.profile.encry_password=undefined
    return res.json(req.profile);
    
}

const putuser = (req,res)=>{
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set:req.body},
        {new: true,userFindAndModify:false},
        (err,user)=>{
            if(err){
                return res.status(400),json({
                    error:"you dont have rights to update this user"
                })
            }
        user.salt= undefined
        user.encry_password=undefined  
        res.status(200).json(user)
        }
    )
}

export {getUserById, getuser, putuser}