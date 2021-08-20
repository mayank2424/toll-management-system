/**
 * Common Error handler Middleware
 */
const logger = require('@helper/logger')('ErrorHandler');
const httpStatus = require('http-status-codes');

/**
 * @description Catch 404 Error if no route found
 */
const handleNotFound = (req, res) => {
    logger.info(`${req.method} ${req.url} > [404]`);
    return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        response: "Resource not found",
    });
};

module.exports = {
    handleNotFound
}