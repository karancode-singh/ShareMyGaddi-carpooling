const user = require("../Models/user");
exports.getuserById =(req,res,next,id)=>{
    console.log("inside get");
    user.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"No User found in DB...."
                
            })
        }
        req.profile=user;
        next();

    });
};

exports.getuser= (req,res)=>{
    console.log("isnide suwee");
    return res.json(req.profile);
}