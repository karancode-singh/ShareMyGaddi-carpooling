const mongoose= require("mongoose")
const schema = mongoose.Schema();
const {ObjectId} = mongoose.Schema
const ProductCartSchema = new schema({
product:{
    type:ObjectId,
    ref:"Product"
    },
    name: String,
    count: Number,
    Price:Number
});
const productcart = mongoose.models("ProductCart",ProductCartSchema);
const orderSchema = new schema({
    products:[ProductCartSchema],
    transaction_id : {},
    amount:{type:String},
    address:String,
    updated:{
        Date
    }
    , user:{
        type: ObjectId,
        ref:"user"
    }

},{timestamps: true});

const Order = mongoose.models("Order",orderSchema);
module.exports ={Order,productcart}
