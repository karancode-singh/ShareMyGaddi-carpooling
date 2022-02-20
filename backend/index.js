import app from './app.js';
import mongoose from "mongoose";
import dotenv from "dotenv";

// Include variables from .env
dotenv.config()
const port = process.env.PORT || 5000;

// MongoDb connection
mongoose.connect(process.env.DATABASE_URI,{ useNewUrlParser: true })
.then(() => {
    console.log("DB Connected")
    app.listen(port,()=>{
        console.log(`Listening to port ${port}`);
    })
})
.catch(error => console.log(error));
