/**
 * User Helper Function
 */

const { UserModel } = require('@models/index');
const requestIp = require('request-ip');

class UserHelper {
    /**
     * @description Generate Unique usernames based on saved users
     * @param { string } userName 
     */
    async getUniqueUserNames(userName, number) {
        const currentUserName = number ? `${userName}${number}` : userName;
        const isUserNameExist = await UserModel.readOneByKey(
            { userName: currentUserName },
            ['_id']
        );
        if(!isUserNameExist) return currentUserName;
        return this.getUniqueUserNames(userName, ++number || 1)
    }

    /**
     * @description Sanitize user object, removes(password, etc..)
     */
    sanitizeUserObject(rawObject) {
        delete rawObject.password;
        delete rawObject.authType;
        delete rawObject.googleAuth;
        delete rawObject._v;
        return rawObject;
    }
}

module.exports = new UserHelper();