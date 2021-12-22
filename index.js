const express = require('express');
const app = express();
const tasks = require('./routes/tasks');

//db connection
const connectDB = require('./database/connect');
require('dotenv').config();

//middleware
app.use(express.json());




app.use('/api/v1/spikapp', spikapps);

const port = 3000;

//keep loading the server until it to connect to db 
const start = async () => {
    try {
        await connectDB(process.env.atlasConnection, 
            console.log('connected to ATLAS MONGODB successfully...'));
        app.listen(port, console.log(`Server running on port ${port}...`));
    } catch (err) {
        console.error(err.stack);
    }
}

start();
