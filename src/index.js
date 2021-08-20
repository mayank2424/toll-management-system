require("module-alias/register");

require('dotenv').config();

//Initialize Db Connection
require('@helper/database/index');
//Register All DB Schema
require('@schema/index');

const app = require('./server');
const logger = require('@helper/logger')('Index');
const { SERVER_PORT, ENV } = require('@config/appConfig');

/**
 * @description  Listen Server at configured port
 */
app.listen(SERVER_PORT, () => {
    logger.info(`Server lighted up on port: ${SERVER_PORT} as ${ENV}`);
})