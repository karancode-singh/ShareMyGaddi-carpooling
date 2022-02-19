import app from './app.js';
import mongoose from "mongoose";
import dotenv from "dotenv";

// Include variables from .env
dotenv.config()
const port = process.env.PORT || 5000;

// MongoDb connection
mongoose.connect(process.env.DATABASE)
.then(console.log("DB Connected"))
.catch(error => console.log(error));

app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
})
