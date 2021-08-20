const mongoose = require('mongoose'); 
const { DATABASE, ENV } = require('@config/appConfig');
const logger = require('@logger')('DbHelper');

//Mongoose Debugging for Dev
if(ENV === 'DEVELOPMENT') {
    mongoose.set("debug", true);
}

const getDbUri = () => {
    return DATABASE.URI
}

const URI = getDbUri();
//Connect To Db
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    logger.info('Mongoose default connection open');
    logger.debug(getDbUri());
});
// If the connection throws an error
mongoose.connection.on('error', (err) => {
    logger.info(`Mongoose default connection error: ${JSON.stringify(err)}`);
    process.exit(1);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', (err) => {
    logger.info('Mongoose default connection disconnected');
    process.exit(1);
});
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        logger.info('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
module.exports = mongoose;