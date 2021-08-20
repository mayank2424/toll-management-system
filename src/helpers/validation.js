/**
 * Common Validators Helper for app
 */
 const { validationResult } = require('express-validator');
const httpStatus = require('http-status');

 exports.checkError = (req, res, next) => {
     const $error = validationResult(req);
     if(!$error.isEmpty()) {
        const response =  $error.array().reduce((acc, o) => ({
            ...acc,
            [o.param]: o.msg
        }), {});
        return res.status(httpStatus.BAD_REQUEST).json({
            status: httpStatus.BAD_REQUEST,
            response,
        })
     }
     next();
 };
