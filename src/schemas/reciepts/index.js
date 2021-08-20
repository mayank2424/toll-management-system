/**
 * Vehicle Receipts Schema
 */
 const mongoose = require('mongoose');


 const ReceiptsSchema = new mongoose.Schema({
    vehicle_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vehicles_types',
        required: true,
    },
    vehicle_number: {
        type: String,
        required: true,
        index: true,
    },
    issue_date: {
        type:Date,
        required: true,
    },
    trip_type: {
        type: String,
        enum: ['one_way', 'two_way']
    },
    is_penalty_applied: {
        type: Boolean,
    },
    is_over_loaded: {
        type: Boolean,
        default: false,
    },
    issued_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    payment_mode:{
        type: String,
        enum: ['cash', 'card', 'upi']
    }
 }, { timestamps: true })

 module.exports = mongoose.model('receipts', ReceiptsSchema);
 
 