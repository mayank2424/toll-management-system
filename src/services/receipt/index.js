// @ts-nocheck
/**
 * Reciept Services
 */
 const { RecieptModel } = require('@models/index');
 const VehiclesService = require('@services/vehicles')
 const moment = require('moment');

 const ReceiptService = {
     
     /**
      * @description Create new receipt
      * @param {string} vehicle_category
      * @param {string } vehicle_number
      * @param {string} trip_type
      * @param {string} trip_time
      * @param {ObjectId} action_by
      * @param {Number} penalty
      * @param {Number} amount
      * @param {Boolean} is_over_loaded
      * 
      * @return { Promise }
      */
     createNewTicket: async ({
         vehicle_category,
         vehicle_number,
         trip_time,
         trip_type,
         action_by,
         is_over_loaded,
         is_penalty_applied,
         payment_mode,
     }) => {
        const payload = {
            vehicle_category,
            vehicle_number,
            issue_date: trip_time,
            trip_type,
            issued_by: action_by,
            is_penalty_applied,
            is_over_loaded,
            payment_mode,
        };
        const isValidVehicle = await VehiclesService.getVehicleById(vehicle_category).catch(err => null);
        if(!isValidVehicle) throw Error('Invalid Vehicle Category');

        //Check if Same Vehicle Receipt already present or not for same time perion
        const isReceiptPresent = await ReceiptService.getSingleReceiptByQuery({
            vehicle_number,
            issue_date: {
                $gte: moment().subtract(2, 'hours'),
                $lte: moment().add(2, 'hours')
            }
        });
        if(isReceiptPresent) throw Error('Toll receipt already created');
        const response = await RecieptModel.create(payload);
        return response;
     },

     /**
      * Get All Receipts list By paginated(we cannot get all at a time)
      */
     getAllReceipts: async (limit = 20, offset = 1) => {
         const toPopulate = [
             { 
                 path: 'vehicle_category',
                 select: 'penalty_amount fare_amount is_heavy_vehicle class_type'
             }
         ];
         const sort = { createdAt: -1 };
         const skip = ((offset || 1) - 1) * limit;
         const response = await RecieptModel.readSortSelectedByKey(
             {},
             [], 
             toPopulate,
             parseInt(skip),
             sort, 
             parseInt(limit)
            );
         return response;
     },

     /**
      * @description Get Single Receipt By vehicle_number
      */
     getSingleReceiptByVehicleNumber: async (vehicle_number) => {
        const now = moment();
        const receipt = await RecieptModel.readOneByKey({
            vehicle_number
        });

        if(!receipt) return { error: false, response: 'Not Found' };
        //Check if Receipt is two way then pass
        const is_valid_issue_date = moment(receipt.issue_date).isBetween(now.startOf('day').toDate(), now.endOf('day').toDate());
        if(receipt.trip_type === 'two_way' && is_valid_issue_date) return { error: false, response: 'Pass vehicle' };
        return { error: false, response: 'Receipt Expired'}
     },

     /**
      * Get Receipt By query
      */
     getSingleReceiptByQuery: (query) => {
         return RecieptModel.readOneByKey(query);
     },

     /**
      * Delete Receipt
      */
     deleteReceipt: async (id) => {
         const response = await RecieptModel.delete({
             _id: id
         });
         if(response && !response.n) {
            throw Error('Receipt Not found')
         };
         return response;
     }
 
 }
 
 module.exports = ReceiptService;