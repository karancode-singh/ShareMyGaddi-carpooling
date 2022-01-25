import app from './server.js';

const port = 8000;

app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
})
