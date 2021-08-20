// @ts-nocheck
/**
 * Vehicles config Services
 */
 const { VehiclesModel } = require('@models/index');

 const VehiclesService = {
     
     /**
      * @description Add new vehicle
      * 
      * @return { Promise }
      */
     addNewVehicle: async ({
        action_by,
        class_type,
        penalty_amount,
        is_active,
        is_heavy_vehicle,
        fare_amount,
     }) => {
        const payload = {
           added_by: action_by,
           class_type,
           penalty_amount,
           is_active,
           is_heavy_vehicle,
           fare_amount,
        };
        console.log({payload});
        const response = await VehiclesModel.create(payload);
        return response;
     },

     /**
      * @description Get Vehicle by Id
      * @param {ObjectId} vehicle_cat_id
      */
     getVehicleById: (vehicle_cat_id) => {
        return VehiclesModel.readOneByKey({
            _id: vehicle_cat_id
        })
     }
 
 }
 
 module.exports = VehiclesService;