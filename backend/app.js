const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();
const bodyparser= require('body-parser')
const cookieparser = require('cookie-parser')
const cors = require('cors')

const authRoutes = require("./Routes/authentication")

// Ports
const port = process.env.PORT||5000;

// MongoDb connection
mongoose.connect(process.env.DATABASE)
.then(console.log("DB Connected"))
.catch(error => console.log(error));

//Middleware
app.use(bodyparser.json())
app.use(cookieparser())
app.use(cors())


//Routes
app.use("/api",authRoutes);

app.get('/',(req,res) => {
 res.send("hello world")
});
app.listen(port,()=>{
    console.log(`listening at ${port}`)
})