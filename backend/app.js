const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config()
const { Client } = require("@googlemaps/google-maps-services-js");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load('./swagger.yaml');



const authRoutes = require("./Routes/authentication");
const allusersRoutes = require("./Routes/allusersRoutes");
//const userRoutes = require("./Routes/user.js");
const tripRoutes = require("./Routes/tripRoutes");

// import cookieparser from "cookie-parser";
// import cors from "cors";
//import swaggerUI from "swagger-ui-express";
//import YAML from 'yamljs';
//import dotenv from "dotenv" 
// import authRoutes from "./Routes/authentication.js";
// import userRoutes from "./Routes/user.js";
// import allusersRoutes from "./Routes/allusersRoutes.js";
//const specs = swaggerJsDoc(options);
//Middleware

//PORT


// MongoDb connection
var db=mongoose.connect(process.env.DATABASE_URI).then(console.log("DB connected"))
//.catch(error => console.log(error));

//Middleware
app.use(bodyparser.json())
app.use(cookieparser())
app.use(cors())

//Routes
app.use("/api", authRoutes);
app.use("/api", allusersRoutes);
//app.use("/api", userRoutes);
app.use("/api", tripRoutes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(process.env.PORT || 8000, () => {
    console.log(`Listening on a port`);
})



    
module.exports = app;
// MongoDb connection
