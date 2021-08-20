// @ts-nocheck
/**
 * Vehicles config Services
 */
 const { VehiclesModel } = require('@models/index');

 const VehiclesService = {
     
     /**
      * @description Add new vehicle
      * @param { ObjectId} action_by
      * @param { string } class_type
      * @param { number } penalty_amount
      * @param { boolean } is_active
      * @param { number } fare_amount
      * @param { boolean } is_heavy_vehicle
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
     },

     /**
      * @description Delete single vehicle by id
      * @param {ObjectId} id
      */
     deleteVehicleType: async (id) => {
         const response = await VehiclesModel.delete({
            _id: id
         });
         if(response && !response.n) {
            throw Error('Vehicle type Not found')
         };
         return response;
     },

     /**
      * @description List all vehicles
      */
     listAllVehicles: async (limit = 20, offset = 1) => {
         const sort = { createdAt: -1 };
         const skip = ((parseInt(offset) || 1) - 1) * limit;
         const response = await VehiclesModel.readSortSelectedByKey(
               {},
               [], 
               [],
               parseInt(skip),
               sort, 
               parseInt(limit)
            );
         return response;
     }
 
 }
 
 module.exports = VehiclesService;