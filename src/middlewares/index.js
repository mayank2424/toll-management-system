/**
 * All Common Middlewares
 */

module.exports = {

    /**
     * @description Assign Global Variables
     */
    assignGlobalVariables: () => {
        global.rootPath = require('path').resolve('./')
    },

    /**
     * @description Parse Request Object
     */
    parseRequestObj: (req = {}, res, next) => {
        req.miniInfo =  {
            query: req.query,
            fullUrl: `${req.hostname}${req.originalUrl}`,
            params: req.params,
            method: req.method,
            url: req.url,
            originalUrl: req.originalUrl,
            host: (req.headers || {}).host,
            cookies: req.cookies,
            ip: req.headers['x-forwarded-for'],
            referer: req.headers.referer
        };
        next();
    }
    
} 
    