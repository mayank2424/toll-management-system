// @ts-nocheck
/**
 * All User Related Controller
 */
const httpStatus = require('http-status-codes');
const { sanitizeUserObject } = require('@helper/user/');
const logger = require('@helper/logger')('UserController');

const UserController = {

    /**
     * @description Get Current User
     * @param {Object} headers
     */
    getCurrentUser: async (req, res) => {
        try {
            const { user } = req;
            const userObj = sanitizeUserObject(user);
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                response: userObj
            });
        } catch(error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: httpStatus.INTERNAL_SERVER_ERROR,
                response: err
            });
        }
    },
};

module.exports = UserController;