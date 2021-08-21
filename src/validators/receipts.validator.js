/**
 * User Related Validators
 */
 const httpStatus = require('http-status-codes');
 const { checkSchema } = require('express-validator');
 
 exports.addReceipt = checkSchema({
    vehicle_category: {
         isMongoId: true,
         errorMessage: 'Please provide valid vehicle id'
     },
     vehicle_number: {
         notEmpty: true,
         errorMessage: 'Please provide Vehicle number',
     },
     trip_type: {
         isIn: {
             options: [['one_way', 'two_way']]
         },
         errorMessage: 'Please provide valid trip_type',
     },
     trip_time: {
         notEmpty: {
             errorMessage: 'Please provide valid date'
         }
     }
 })
 
 exports.getSingleReceipt =  checkSchema({
    vehicle_number: {
        in: 'query',
        notEmpty: {
            errorMessage: 'Please provide vehicle_number'
        }
    }
 })
 
 exports.deleteReceipt =  checkSchema({
    id: {
        in: 'params',
        isMongoId: {
            errorMessage: 'Please provide valid receipt id'
        }
    }
 })
 