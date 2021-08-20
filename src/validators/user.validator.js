/**
 * User Related Validators
 */
const httpStatus = require('http-status-codes');
const { UserService } = require('@services/index');
const { USER: userResponseConfig } = require('@config/apiResponse')

exports.findUserByEmail = async(req, res, next) => {
    const { email } = req.body;
    const user = await UserService.getUserByEmail(email, ['_id email userName name appearance'], []);
    if(!user) return req.errorResponseHelper(res, userResponseConfig.notFound, httpStatus.NOT_FOUND);
    req.body.user = user;
    next();   
}