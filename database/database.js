const path = require('path');
const config = require(path.resolve('utilities', 'configuration'));
const fancyTerminal = require('consola');
const mongoose = require('mongoose');
//let ip = require('public-ip');

class Database {
    mongodb () {
        let retry = 0;
        //starting database connection
        const DBconnect = async conStrings => {
            fancyTerminal.info('Processing MongoDB connection...');

            return mongoose.connect(conStrings || config.atlassConnection, {
                useNewUrlParser: true,
                useUnifiedTopology: true,               
            }, err => {

                let retry =0;
                if (err) {

                if (!retry==3) {
                    retry++;

                    if(retry>1) fancyTerminal.info('Retrying again in 5 seconds...');
                    else fancyTerminal.info('Retrying in 5 seconds...');

                    setTimeout(() => DBconnect(conStrings || config.atlasConnection),
                    5000);
                } else {
                    fancyTerminal.info('Now processing to connect locally...');
                    setTimeout(() => DBconnect(config.localConnection), 5000);
                } 

            } else fancyTerminal.success('MongoDB connected successfully...')
        
        }

        );

        };
        return {DBconnect};
    }
}


module.exports = Database;