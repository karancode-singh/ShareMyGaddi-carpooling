import express from "express";
import bodyparser from "body-parser";
import cookieparser  from "cookie-parser";
import cors  from "cors";

import authRoutes from "./Routes/authentication.js"

const app = express();

//Middleware
app.use(bodyparser.json())
app.use(cookieparser())
app.use(cors())

app.get('/',(req, res) => {
    res.send("Hello Backend")
})

//Routes
app.use("/api",authRoutes);

app.get('/',(req,res) => {
 res.send("hello world")
});

export default app;