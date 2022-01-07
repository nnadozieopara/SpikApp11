const path = require('path');
const config = require(path.resolve('utilities', 'configuration'));

const express = require('express');
const app = express();

// keep tracks of activity on the server in a file and then create a new log file
const logTrack = require('rotating-file-stream');
const logger = require('morgan');

const LogMorgan = async ()  => {
//create a log stream
const logTrackStream = logTrack.createStream(config.file, {
    size: config.size,
    interval: config.interval,
    compress: config.compress
});

//if log file is stored in/defined then use if not print to console
app.use(logger(config.format), {
    stream: config.file ? logTrackStream: process.stdout
});

//if log file is stored already then also show logs in console
//else it will use the previous process.stdout to print to console
if (config.file) {
    app.use(logger(config.format));
};

console.log(next);

};

module.exports = LogMorgan;
