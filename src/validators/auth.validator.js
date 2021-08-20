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

 
exports.validateSignUpRequest = checkSchema({
    email: {
        notEmpty: true,
        isEmail: true,
        errorMessage: "Please provide valid email"
    },
    password: {
        notEmpty: true,
        isString: true,
        errorMessage: "Password is required"
    },
    name: {
        notEmpty: true,
        isString: true,
        errorMessage: "Please provide valid name"
    }
})


exports.isUserExist = async (req, res, next) => {
    const { email } = req.body;
    if(!email) return  res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        response: "User not exist"
    });
    const user = await UserService.getUserByEmail(email, []);
    if(!user) return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        response: "User not exist"
    });
    req.body.user = user;
    next();
}