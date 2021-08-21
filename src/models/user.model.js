/**
 * User Model Helper
 */
const mongoose = require('mongoose');
const User = mongoose.model('user');


/**
 * All model CRUD Methods
 */

//Create
exports.create = async (user) => {
    return await User.create(user);
};

//Read
exports.readByKey = async (query, sortBy = null, limit = null) => {
    const user = await User.find(query, sortBy, limit).lean();
    return user;
};

//Read One By key
exports.readOneByKey = async(query, select = [], populate = []) => {
    const user = await User.findOne(query)
        .populate(populate)
        .select(select.join(' '))
        .lean();
    return user;
};

//Read Selected By Key
exports.readSelectedByKey = async(query, select = [], populate = []) => {
    const users = await User.find(query)
        .populate(populate)
        .select(select.join(' '))
        .lean();
    return users;
};

//Update Single
exports.update = async(query, condition, options = { new: true, runValidators: true }) => {
    return User.findOneAndUpdate(query, condition, options)
    .lean()
}

//Delete Single
exports.delete = async(query) => {
    return User.deleteOne(query)
}