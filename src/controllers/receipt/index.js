// @ts-nocheck
/**
 * All Toll Receipt Related Controller
 */
 const httpStatus = require('http-status-codes');
 const logger = require('@helper/logger')('ReceiptController');
 const { ReceiptService } = require('@services/index')
 
 const ReceiptController = {
 
     /**
      * @description Add new Receipt
      * @param {Object} headers
      */
     createNewReceipt: async (req, res) => {
         try {
             const { user, body: {
                vehicle_number,
                vehicle_category,
                trip_type,
                is_penalty_applied,
                is_over_loaded,
                trip_time,
                payment_mode,
             } } = req;
             const response = await ReceiptService.createNewTicket({
                vehicle_number,
                vehicle_category,
                trip_type,
                is_penalty_applied,
                is_over_loaded,
                action_by: user._id,
                trip_time,
                payment_mode,
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
      * Get All Reciepts
      */
     getAllReceipts: async (req, res) => {
         try {
            const { limit, offset } = req.query;
            const receipts = await ReceiptService.getAllReceipts(limit, offset);
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                response: receipts
            });
         } catch(error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: httpStatus.INTERNAL_SERVER_ERROR,
                response: error.message
            });
        }
     },

     /**
      * Check Single Receipt
      */
     checkReceipt: async(req, res) => {
        try {
            const { vehicle_number } = req.query;
            const { error, response } = await ReceiptService.getSingleReceiptByVehicleNumber(vehicle_number);
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                response
            });
         } catch(error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: httpStatus.INTERNAL_SERVER_ERROR,
                response: error.message
            });
        }
     },

     /**
      * Delete Single Receipt
      */
     deleteReceipt: async(req, res) => {
        try {
            const { id } = req.params;
            const { error, response } = await ReceiptService.deleteReceipt(id);
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                response
            });
         } catch(error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: httpStatus.INTERNAL_SERVER_ERROR,
                response: error.message
            });
        }
     }


 };
 
 module.exports = ReceiptController;