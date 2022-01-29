import mongoose from "mongoose";
import crypto from "crypto";
import {v1 as uuidv1 } from "uuid";

const schema = mongoose.Schema;
const userSchema = new schema({
    name :{
        type:String,
        require:true,
        maxlength:32,
        trim:true
    },
    lastname:{
        type:String,
        maxlength:32,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
    },
    userinfo:{
        type:String,
        trim:true,
    },
    encry_password:{
        type:String,
        require:true,
    
    },
    salt:String, // will store the encryption of password field
    role:{
        type: Number, // higher the number higher the privleages
        default:0
    },
    purchases:{
        type:Array,
        default:[]
    }


},{timestamps: true});
userSchema.virtual("password").set(function(password){
    this._password=password,
    this.salt=uuidv1();
    this.encry_password= this.securePassword(password);
})
.get(function(){
    return this._password;
});
userSchema.methods ={
    authenticate:function(plainpassword){
        return this.securePassword(plainpassword)===this.encry_password;
    },
    securePassword : function(plainpassword){
        if(!plainpassword)
        return ""
        try{
            
            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        }
        catch(err){
                return "";
        }
    }
}
// module.exports = mongoose.model("user",userSchema)
export default mongoose.model("user",userSchema)