const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();
const port =process.env.PORT || 5000;

mongoose.connect(process.env.DATABASE)
.then(console.log("DB Connected"))
.catch(error => console.log(error));


app.get('/',(req,res) => {
 res.send("hello world")
});

app.listen(port,()=>{
    console.log(`listening at ${port}`)
})