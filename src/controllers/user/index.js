// @ts-nocheck
/**
 * All User Related Controller
 */
const httpStatus = require('http-status-codes');
const { sanitizeUserObject } = require('@helper/user/');
const logger = require('@helper/logger')('UserController');
const { UserService, AuthService } = require('@services/index');


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
                response: error
            });
        }
    },

    /**
     * @description List usets
     * @param {req} Object
     * @param { res} Object
     * @param {next} Function
     */
     listUsers: async (req, res, next) => {
        try {
            const response = await UserService.listUsers();
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                response: response,
            });
        } catch(error) {
            logger.error(`[listUsers] Error while listing users:`, { err, sendToSentry: true })
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: httpStatus.INTERNAL_SERVER_ERROR,
                response: err.message
            });
        }
    },

    /**
     * @description Delete user
     * @param {req} Object
     * @param { res} Object
     * @param {next} Function
     */
     deleteUser: async (req, res, next) => {
        try {
            const { userId } = req.params;
            await UserService.deleteUser(userId);
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                response: "OK",
            });
        } catch(error) {
            logger.error(`[deleteUser] Error while deleting user:`, { error, sendToSentry: true })
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: httpStatus.INTERNAL_SERVER_ERROR,
                response: error.message
            });
        }
    },

    /**
     * @description Add new user/staff Controller
     * @param {req} Object
     * @param { res} Object
     * @param {next} Function
     */
     addUser: async (req, res, next) => {
        try { 
            const { email, password, name, gender, contact_number, profile_image } = req.body;
            const { status, statusCode, result } = await AuthService.addNewUser({ 
                email, 
                password, 
                name, 
                contact_number, 
                profile_image, 
                gender 
            });
            if(!status) return res.status(statusCode).json({
                status: statusCode,
                response: result
            });
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                response: result,
            });
        } catch(error) {
            logger.error(`[addUser] Error while adding user up:`, { error, sendToSentry: true })
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: httpStatus.INTERNAL_SERVER_ERROR,
                response: error.message
            });
        }
    },
};

module.exports = UserController;