//async errors
require('express-async-errors');
const express = require('express');
const app = express();
const config = require('./utilities/configuration');

//extra security package
/*log system*/ const LogMorgan = require('./utilities/logSystem');
const crossPortAccess = require('cors');
const trackActivities = require('cookie-parser');
const headerSecure = require('helmet');

//errors package
const ErrorHandler = require('./utilities/errorHandler');
const NotFound = require('./utilities/notFound');

//routes usage
//const authorization = require('./middlewares/authorization');
const authRouter = require('./routes/auth');
const schoolRouter = require('./routes/school');


require('dotenv').config();
//import dotenv only in development server
if (app.get('env') === 'development') require('dotenv').config()

/*middleware*/
//handle public assets
app.use(express.static('public'));
app.use(express.json());

/**securities middleware */
// different port from client a picked and responded to safely
app.use(crossPortAccess());
// keep track of client information and access on the browser
app.use(trackActivities());
//secure the http header due to the gap between the node and express
app.use(headerSecure());


//routes set up
app.use('/api/v1/spikapp', authRouter);
app.use('/api/v1/spikapp', schoolRouter);

/**this must be set up after the route set up */
//this pick up request and log whatever u want easily 
app.use(LogMorgan);
/*Errors middleware*/
app.use(ErrorHandler);
app.use(NotFound);



app.set('port',  config.port)


module.exports = app;
