/**
 * Root Utils
 */
const { ENV } = require('@config/appConfig');

const Utils = {
    isDevEnv: () => ENV === 'DEVELOPMENT',
};

module.exports = Utils;