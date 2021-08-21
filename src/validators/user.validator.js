/**
 * User Related Validators
 */
const httpStatus = require('http-status-codes');
const { checkSchema } = require('express-validator');

exports.addUser = checkSchema({
    email: {
        isEmail: true,
        errorMessage: 'Please provide valid email'
    },
    password: {
        isString: true,
        errorMessage: 'Please provide valid password',
    },
    name: {
        notEmpty: true,
        errorMessage: 'Please provide name',
    },
    gender: {
        notEmpty: true,
        isIn: {
            options: [['male', 'female', 'others']]
        },
        errorMessage: 'Please provide valid gender(male/female/others)'
    },
    contact_number: {
        isMobilePhone: true,
        errorMessage: 'Please provide valid contact number'
    }
})

exports.deleteUser =  checkSchema({
    userId: {
        in: 'params',
        isMongoId: {
            errorMessage: 'Please provide valid user id'
        }
    }
})
