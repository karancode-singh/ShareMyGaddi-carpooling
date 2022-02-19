import express from "express";

import bodyparser from "body-parser";
import cookieparser from "cookie-parser";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import dotenv from "dotenv" 

dotenv.config()

const app = express();

import authRoutes from "./Routes/authentication.js";
import userRoutes from "./Routes/user.js";
import allusersRoutes from "./Routes/allusersRoutes.js";

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

const specs = swaggerJsDoc(options);

//Middleware
app.use(bodyparser.json())
app.use(cookieparser())
app.use(cors())


//Routes
app.get('/',(req, res) => {
    res.send("Hello Backend")
})

app.use("/api",authRoutes);
app.use("/api",userRoutes)
app.use("/api",allusersRoutes)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));


export default app;