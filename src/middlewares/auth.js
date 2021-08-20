/**
 * @descriptiion Auth Middleware
 */
const passport = require('passport');
const httpStatus = require('http-status-codes');
const { SECRET_KEY } = require('@config/appConfig');

/**
 * @description Public aut middleware
 */
exports.publicAuthMiddleware = (req, res, next) => {
    // @ts-ignore
    passport.authenticate('jwt', async(err, user, info) => {
        if(!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                status: httpStatus.UNAUTHORIZED,
                response: httpStatus.getStatusText(httpStatus.UNAUTHORIZED)
            });
        }
        req.user = user;
        next();
    }, { session: false })(req, res, next)
};

exports.isAdmin = (req, res, next) => {
    const { user } = req;
    if(!user || !user.roles || !user.roles.length || !user.roles.includes('admin')) {
        return res.status(httpStatus.FORBIDDEN).json({
            status: httpStatus.FORBIDDEN,
            response: httpStatus.getStatusText(httpStatus.FORBIDDEN)
        });
    };
    return next();
}


exports.isStaff = (req, res, next) => {
    const { user } = req;
    console.log({user});
    if(!user || !user.roles || !user.roles.length || !user.roles.includes('staff')) {
        return res.status(httpStatus.FORBIDDEN).json({
            status: httpStatus.FORBIDDEN,
            response: httpStatus.getStatusText(httpStatus.FORBIDDEN)
        });
    };
    return next();
}
