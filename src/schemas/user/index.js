/**
 * User Schema
 */
const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
    },
    profile_image: {
        type: String
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'others']
    },
    contact_number: {
        type: String,
        required: true,
    },
    roles: [
        { 
            type: String,
            enums: ['ADMIN', 'STAFF']
        }
    ]

}, { timestamps: true })


//Hooks for deleting passworh when reading user data
UserSchema.set('toJSON', {
    transform: (doc, ret, opt) => {
        delete ret.password; 
        return ret;
    }
})

module.exports = mongoose.model('user', UserSchema);