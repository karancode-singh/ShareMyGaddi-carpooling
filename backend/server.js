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

//Routes
app.get('/',(req, res) => {
    res.send("Hello Backend")
})

app.use("/api",authRoutes);

export default app;