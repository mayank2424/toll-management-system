// @ts-nocheck
/**
 * User Service, All Service logics land here
 */
const { UserModel } = require('@models/index');

const UserService = {
    
    /**
     * @description Get user By Email
     * @param {string} email
     * @param { Array } toSelect
     * @param { Array } toPopulate
     * @return { Promise } userObj
     */
    getUserByEmail: async (email, toSelect = [], toPopulate = []) => {
        return UserModel.readOneByKey({email}, toSelect, toPopulate)
    },
    

    getUserById: async (userId) => {
        return UserModel.readOneByKey({
            _id: userId
        }, [], [])
    },

    /**
     * @description Create New User
     * @param { Object } user
     */
    createNewUser: async (user) => {
        return UserModel.create(user);
    },
    
    /**
     * @description Update User profile
     * @param { Object } query
     * @param { Object } condition
     */
    updateUserProfile: async(query, condition) => {
        return UserModel.update(
            query,
            condition,
        )
    }
}

module.exports = UserService;