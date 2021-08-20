// @ts-nocheck
/**
 * All Aauth Route Controller Lands Here
 */
const httpStatus = require('http-status-codes');
const passport = require('passport');
const { UserService, AuthService } = require('@services/index');
const { signNewToken } = require('@helper/auth/index');
const UserHelper = require('@helper/user/');
const logger = require('@helper/logger')('AuthController');


const AuthController = {

    /**
     * @description SignIn Controller
     */
    signIn: (req, res, next) => {
        //Use passport local authenticate method
        passport.authenticate('login', { session: false }, (info, user, error) => {
            
            if(error) {
                const { message } = error;
                logger.error(`[signIn] Error while login:`, { error, sendToSentry: true })
                return res.status(httpStatus.BAD_REQUEST).json({
                    status: httpStatus.BAD_REQUEST,
                    response: message
                });
            }
            req.login(user, { session: false }, (err, e) => {
                if(err) {
                    logger.error(`[signIn] Error while login:`, { error: err, sendToSentry: true })
                    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                        status: httpStatus.INTERNAL_SERVER_ERROR,
                        response: err
                    });
                }
                if(!user) return res.status(httpStatus.BAD_REQUEST).json({
                    status: httpStatus.BAD_REQUEST,
                    response: "User not found"
                });
                const token = signNewToken(user._id);
                const response = { ...Object.assign(UserHelper.sanitizeUserObject(user)), token };
                
                return res.status(httpStatus.OK).json({
                    status: httpStatus.OK,
                    response,
                });
            })
           
        })(req, res, next);
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
        } catch(err) {
            logger.error(`[signUp] Error while signin up:`, { err, sendToSentry: true })
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: httpStatus.INTERNAL_SERVER_ERROR,
                response: err.message
            });
        }
    },
}

module.exports = AuthController;