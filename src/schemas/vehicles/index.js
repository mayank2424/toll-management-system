/**
 * Vehicle Types Config Schema
 */
 const mongoose = require('mongoose');

 const VehiclesTypesSchema = new mongoose.Schema({
    added_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    class_type: {
        type: String,
    },
    penalty_amount: {
        type: Number,
    },
    is_active: {
        type: Boolean,
    },
    is_heavy_vehicle: {
        type: String,
    },
    fare_amount: {
        type: Number,
        required: true,
    },

 }, { timestamps: true })

 module.exports = mongoose.model('vehicles_types', VehiclesTypesSchema);
 
 