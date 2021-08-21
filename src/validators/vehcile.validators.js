/**
 * User Related Validators
 */
 const httpStatus = require('http-status-codes');
 const { checkSchema } = require('express-validator');


 
 exports.addVehicle = checkSchema({
    class_type: {
         notEmpty: true,
         errorMessage: 'Please provide valid type for vehicle'
     },
     fare_amount: {
         isNumeric: true,
         errorMessage: 'Fare amount cannot be less than 10'
     },
     is_heavy_vehicle: {
         isBoolean: {
             errorMessage: 'Please provide true/false'
         }
     },
     is_active: {
        isBoolean: {
            errorMessage: 'Please provide true/false'
        }
    },
 })
 
 exports.deleteVehicle =  checkSchema({
    id: {
        in: 'params',
        isMongoId: {
            errorMessage: 'Please provide valid vehicle id'
        }
    }
 })
 