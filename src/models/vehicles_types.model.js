/**
 * Tolls Vehicles Types Model Helper
 */
 const mongoose = require('mongoose');
 const Vehicles = mongoose.model('vehicles_types');
 
 
 /**
  * All model CRUD Methods
  */
 
 //Create
 exports.create = async (obj) => {
     return await Vehicles.create(obj);
 };
 
 //Read
 exports.readByKey = async (query, sortBy = null, limit = null) => {
     const response = await Vehicles.find(query, sortBy, limit).lean();
     return response;
 };
 
 //Read One By key
 exports.readOneByKey = async(query, select = [], populate = []) => {
     const response = await Vehicles.findOne(query)
         .populate(populate)
         .select(select.join(' '))
         .lean();
     return response;
 };
 
 //Read Selected By Key
 exports.readSelectedByKey = async(query, select = [], populate = []) => {
     const response = await Vehicles.find(query)
         .populate(populate)
         .select(select)
         .lean();
     return response;
 };
 
 //Update Single
 exports.update = async(query, condition, options = { new: true, runValidators: true }) => {
     return Vehicles.findOneAndUpdate(query, condition, options)
     .lean()
 }


  //Read sortSelected By Key
  exports.readSortSelectedByKey = async(query, select = [], populate = [], skip = 0, sort = {}, limit=20) => {
    const response = await Vehicles.find(query)
        .populate(populate)
        .select(select)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();
    return response;
};