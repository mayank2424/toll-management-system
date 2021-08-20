// @ts-nocheck
/**
 * Helper File for auth
 */
const bcrypt = require('bcrypt');
const { PASSWORD_HASH_SALT, CRYPTO_CONFIG, AUTH_TYPES } = require('@config/auth.config');
const JWT = require('jsonwebtoken');
const { JWT_SECRET, GOOGLE_CREDS } = require('@config/appConfig');
const crypto = require('crypto');
const { now } = require('@utils/date');
const UserService = require('@services/user');
const { getDateDiff } = require('@utils/date');


class ResetPassword {
    constructor() {
        this.cryptoAlgo = CRYPTO_CONFIG.algorithm;
        this.cryptoPass = CRYPTO_CONFIG.password;
        this.cryptoEncKeys = CRYPTO_CONFIG.ENC_KEYS;
        this.cryptoDecKeys = CRYPTO_CONFIG.DEC_KEYS;
    }

    generateNewToken(userId) {
        const cipher = crypto.createCipher(this.cryptoAlgo, this.cryptoPass);
        let cipherStringWithCharac = cipher.update(`${userId}_${now()}`, "utf8", "base64");
        cipherStringWithCharac += cipher.final("base64");
        return {
            cipherString: cipherStringWithCharac,
            plainCipherString: cipherStringWithCharac.replace(/[+/=]/g, (c) => this.cryptoEncKeys[c])
        }
    }

    getUserIdAndTimeFromToken(token) {
        const decipher = crypto.createDecipher(this.cryptoAlgo, this.cryptoPass);
        const $token = token.replace(/[-_.]/g, (c) => this.cryptoDecKeys[c]);
        let dec = decipher.update($token, 'base64', 'utf8');
        dec += decipher.final('utf8');
        const [userId, time] = dec.split('_');
        return {
            userId, time, $token
        }
    }

    async verifyUserToken(token) {
        const { userId, time, $token } = this.getUserIdAndTimeFromToken(token);
        const timeDiff = getDateDiff(new Date(), time, 'hours');
        if(typeof time === "undefined" || timeDiff > 1) return {
            status: false,
            response: 'TOKEN_EXPIRED'
        }
        const updateResponse = await UserService.getSingleUserByQuery({
            _id: userId,
            resetPasswordToken: $token
        }, ['_id']);
        if(!updateResponse) return {
            status: false,
            response: 'INVALID_TOKEN'
        }
        return {
            status: true,
            response: 'VALID_TOKEN',
            userId,
            decipherToken: $token
        }
    }

}

module.exports = {
    /**
     * @description Created Unique hash password using bcrupt
     */
    createUniqueHash: (password) => {
        return bcrypt.hashSync(password, PASSWORD_HASH_SALT);
    },

    /**
     * @description Compare password hashes saved on db and password passed
     */
    isPasswordMatch: (password, savedPassword) => {
         return bcrypt.compareSync(password, savedPassword);
    },

    /**
     *@description Generate New Token 
     @param { string } userId
     */
    signNewToken: (userId) => {
        return JWT.sign({ _id: userId }, JWT_SECRET);
    },
    resetPasswordHelper: new ResetPassword(),
};


