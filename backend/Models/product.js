const mongoose= require('mongoose');
const schema = mongoose.Schema();
const {ObjectId} =mongoose.Schema;
const productSchema = new schema({

    name:{
        type:String,
        required: true,
        maxlength:32,
        trim:true

    },
    description:{
        type:String,
        required: true,
        maxlength:2000,
        trim:true
    },
    price:{
        type:Number,
        required: true,
        maxlength:32,
        trim:true
    },
    category:{
        type: ObjectId,
        ref:"Category",
        required: true
    },
    stock:{
        type: Number
    },
    sold:{
        type: Number,
        default:0
    },
    photos:{
        data: Buffer,
        contentType: String
    }
},{timestamps:true});

module.exports = mongoose.model("Product",productSchema)