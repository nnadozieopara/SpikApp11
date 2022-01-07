const fancyTerminal = require('consola');
const app = require('./index');
//db connection
const config = require('./utilities/configuration');
const Database = require('./database/database');


//keep loading the server until it to connect to db 
const start = async () => {
    try {
        await 
        new Database().mongodb().DBconnect(config.atlasConnection) 
        app.listen(app.get("port"), _ => fancyTerminal.success(`Server running on port ${app.get("port")}...`));
    } catch (err) {
        console.error(err);
    }
}

start();
