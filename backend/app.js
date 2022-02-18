const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyparser= require('body-parser')
const cookieparser = require('cookie-parser')
const cors = require('cors')
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc");
require('dotenv').config()


const authRoutes = require("./Routes/authentication.js")
const userRoutes = require("./Routes/user")
const allusersRoutes = require("./Routes/allusersRoutes")

var options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		servers: [
			{
				url: "http://localhost:8000",
			},
		],
	},
	apis: ['./Routes/*.js'],
};
// Ports
const port = process.env.PORT||5000;
const specs = swaggerJsDoc(options);
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
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));






app.listen(port,()=>{
    console.log(`listening a ${port}`)
})
module.exports = app;