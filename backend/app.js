const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyparser= require('body-parser')
const cookieparser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()


const authRoutes = require("./Routes/authentication")
const userRoutes = require("./Routes/user")
const allusersRoutes = require("./Routes/allusersRoutes")

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
app.use("/api",userRoutes)
app.use("/api",allusersRoutes)


app.listen(port,()=>{
    console.log(`listening a ${port}`)
})
module.exports = app;