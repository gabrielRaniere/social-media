import app from "./app";
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORTSERVER;

app.listen(port, ()=> {
    console.log('local server running');
})