/**
 * Auth Related Validators
 */
 const { checkSchema } = require('express-validator');
 const { AUTH:authResponseConfig } = require('@config/apiResponse');
 const UserService = require('@services/user');
 const httpStatus = require('http-status-codes');
 
exports.validateSignInRequest = checkSchema({
    email: {
        notEmpty: true,
        isEmail: true,
        errorMessage: authResponseConfig.email.invalid
    },
    password: {
        notEmpty: true,
        errorMessage: authResponseConfig.password.required
    }
})
