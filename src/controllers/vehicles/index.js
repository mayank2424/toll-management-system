// @ts-nocheck
/**
 * All Toll Vehicles Controller
 */
 const httpStatus = require('http-status-codes');
 const logger = require('@helper/logger')('VehiclesController');
 const { VehiclesService } = require('@services/index')
 
 const VehiclesController = {
 
     /**
      * @description Add new vehicle type
      * @param {*} req
      * @param {*} res
      */
     addNewVehicle: async (req, res) => {
         try {
             const { user, body: {
                class_type,
                fare_amount,
                penalty_amount,
                is_active,
                is_heavy_vehicle
             } } = req;
             const response = await VehiclesService.addNewVehicle({
                class_type,
                fare_amount,
                penalty_amount,
                is_active,
                is_heavy_vehicle,
                action_by: user._id
             })
             return res.status(httpStatus.OK).json({
                 status: httpStatus.OK,
                 response: response
             });
         } catch(error) {
             return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                 status: httpStatus.INTERNAL_SERVER_ERROR,
                 response: error.message
             });
         }
     },

     /**
      * @description Delete vehicle
      * @param {*} req
      * @param {*} res
      */
     deleteVehicle: async (req, res) => {
         try {
            const { id } = req.params;
            await VehiclesService.deleteVehicleType(id);
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                response: 'OK'
            });
         } catch(error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: httpStatus.INTERNAL_SERVER_ERROR,
                response: error.message
            });
         }
     },

     /**
      * @description List all vehicles
      * @param {*} req
      * @param {*} res
      */
    listAll: async (req, res) => {
        try {
           const { limit, offset } = req.query;
           const response = await VehiclesService.listAllVehicles(limit, offset );
           return res.status(httpStatus.OK).json({
               status: httpStatus.OK,
               response,
           });
        } catch(error) {
           return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
               status: httpStatus.INTERNAL_SERVER_ERROR,
               response: error.message
           });
        }
    },

 };
 
 module.exports = VehiclesController;