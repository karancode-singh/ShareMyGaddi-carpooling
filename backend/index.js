import app from './server.js';
import dotenv from "dotenv";

// Include variables from .env
dotenv.config()
const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
})
