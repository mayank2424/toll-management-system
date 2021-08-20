/**
 * Auth related Utils
 */
const { FRONTEND_DOMAIN } = require('@config/appConfig');

exports.generateResetPasswordLink = (resetToken) => {
    return `${FRONTEND_DOMAIN}?token=${resetToken}`
};