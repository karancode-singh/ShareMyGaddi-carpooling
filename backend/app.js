import express from "express";

import bodyparser from "body-parser";
import cookieparser from "cookie-parser";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./swagger.yaml');

import dotenv from "dotenv" 

dotenv.config()

const app = express();

import authRoutes from "./Routes/authentication.js";
import userRoutes from "./Routes/user.js";
import allusersRoutes from "./Routes/allusersRoutes.js";



//const specs = swaggerJsDoc(options);
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
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


export default app;